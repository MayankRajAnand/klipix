import { useState, useCallback } from 'react';
import type { JobStatus } from '@/types/video';
import * as videoService from '@/services/videoService';

interface UseVideoProcessingResult<TRequest, TResponse> {
  isProcessing: boolean;
  error: string | null;
  result: TResponse | null;
  jobStatus: JobStatus | null;
  process: (request: TRequest) => Promise<TResponse | null>;
  reset: () => void;
}

/**
 * Generic hook for video processing operations
 */
function useVideoProcessing<TRequest, TResponse>(
  processFn: (request: TRequest) => Promise<TResponse>
): UseVideoProcessingResult<TRequest, TResponse> {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TResponse | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);

  const process = useCallback(async (request: TRequest): Promise<TResponse | null> => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setJobStatus(null);

    try {
      const response = await processFn(request);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [processFn]);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setError(null);
    setResult(null);
    setJobStatus(null);
  }, []);

  return {
    isProcessing,
    error,
    result,
    jobStatus,
    process,
    reset,
  };
}

/**
 * Hook for converting videos to shorts
 */
export function useConvertShorts() {
  return useVideoProcessing(videoService.convertToShorts);
}

/**
 * Hook for generating faceless shorts
 */
export function useFacelessShorts() {
  return useVideoProcessing(videoService.generateFacelessShort);
}

/**
 * Hook for adding auto captions
 */
export function useAutoCaptions() {
  return useVideoProcessing(videoService.addAutoCaptions);
}

/**
 * Hook for script generation
 */
export function useScriptGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (topic: string): Promise<string | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await videoService.generateScript(topic);
      setScript(response.script);
      return response.script;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate script';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { isGenerating, script, error, generate, setScript };
}

/**
 * Hook for file upload with progress
 */
export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);
    setUploadedFile(file);

    try {
      const response = await videoService.uploadVideo(file);
      setUploadedUrl(response.url);
      return response.url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsUploading(false);
    setUploadedFile(null);
    setUploadedUrl(null);
    setError(null);
  }, []);

  return { isUploading, uploadedFile, uploadedUrl, error, upload, reset, setUploadedFile };
}
