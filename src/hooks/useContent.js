import { useState, useEffect, useCallback } from 'react';
import { ContentService } from '../lib/services/contentService';

export function useContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ContentService.getContent();

      if (result.success) {
        setContent(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveContent = useCallback(async (newContent) => {
    try {
      setSaving(true);
      setError(null);
      const result = await ContentService.updateContent(newContent);

      if (result.success) {
        setContent(newContent);
      } else {
        setError(result.error);
      }

      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  }, []);

  const updateSection = useCallback(async (sectionName, sectionData) => {
    try {
      setSaving(true);
      setError(null);
      const result = await ContentService.updateSection(sectionName, sectionData);

      if (result.success) {
        setContent(prev => prev ? { ...prev, [sectionName]: sectionData } : null);
      } else {
        setError(result.error);
      }

      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  }, []);

  const updateHero = useCallback((heroData) => updateSection('hero', heroData), [updateSection]);
  const updateFeatures = useCallback((featuresData) => updateSection('features', featuresData), [updateSection]);
  const updateProducts = useCallback((productsData) => updateSection('products', productsData), [updateSection]);
  const updateAbout = useCallback((aboutData) => updateSection('about', aboutData), [updateSection]);
  const updateContact = useCallback((contactData) => updateSection('contact', contactData), [updateSection]);
  const updateLogo = useCallback(async (logoUrl) => {
    try {
      setSaving(true);
      setError(null);
      const result = await ContentService.updateLogo(logoUrl);

      if (result.success) {
        setContent(prev => prev ? { ...prev, logo: logoUrl } : null);
      } else {
        setError(result.error);
      }

      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    content,
    loading,
    error,
    saving,
    fetchContent,
    saveContent,
    updateSection,
    updateHero,
    updateFeatures,
    updateProducts,
    updateAbout,
    updateContact,
    updateLogo,
    clearError: () => setError(null)
  };
}