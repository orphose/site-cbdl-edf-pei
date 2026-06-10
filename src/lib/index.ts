/**
 * Export centralisé des modules Supabase
 */
export { supabase, getMediaUrl, STORAGE_URL } from './supabase';
export { getPublishedNews, getNewsBySlug, getActivePartnerships, getPartnershipBySlug } from './api';
export type { News, NewsInsert, NewsUpdate, Partnership, PartnershipInsert, PartnershipUpdate, Database } from './database.types';

