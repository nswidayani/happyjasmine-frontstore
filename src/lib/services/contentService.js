import { getContent, updateContent } from '../supabase';

// Content service for managing landing page content
export class ContentService {
  static async getContent() {
    try {
      const result = await getContent();
      return result;
    } catch (error) {
      console.error('ContentService.getContent error:', error);
      throw error;
    }
  }

  static async updateContent(content) {
    try {
      const result = await updateContent(content);
      return result;
    } catch (error) {
      console.error('ContentService.updateContent error:', error);
      throw error;
    }
  }

  static async updateSection(sectionName, sectionData) {
    try {
      const currentContent = await this.getContent();
      if (!currentContent.success) {
        return currentContent;
      }

      const updatedContent = {
        ...currentContent.data,
        [sectionName]: sectionData
      };

      return await this.updateContent(updatedContent);
    } catch (error) {
      console.error(`ContentService.updateSection error for ${sectionName}:`, error);
      throw error;
    }
  }

  static async updateHero(heroData) {
    return this.updateSection('hero', heroData);
  }

  static async updateFeatures(featuresData) {
    return this.updateSection('features', featuresData);
  }

  static async updateProducts(productsData) {
    return this.updateSection('products', productsData);
  }

  static async updateAbout(aboutData) {
    return this.updateSection('about', aboutData);
  }

  static async updateContact(contactData) {
    return this.updateSection('contact', contactData);
  }

  static async updateLogo(logoUrl) {
    try {
      const currentContent = await this.getContent();
      if (!currentContent.success) {
        return currentContent;
      }

      const updatedContent = {
        ...currentContent.data,
        logo: logoUrl
      };

      return await this.updateContent(updatedContent);
    } catch (error) {
      console.error('ContentService.updateLogo error:', error);
      throw error;
    }
  }

  // Validation helpers
  static validateUrl(url) {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  }

  static validateEmail(email) {
    if (!email) return true; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateRequired(value, fieldName) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      throw new Error(`${fieldName} is required`);
    }
    return true;
  }
}