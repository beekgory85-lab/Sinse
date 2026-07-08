export type ScienceCategory = 'biology' | 'physics' | 'chemistry' | 'earth' | 'lab_prep';

export type ActiveTab = 
  | 'dashboard'
  | 'microscope'
  | 'cell_organelles'
  | 'physics_energy'
  | 'chemistry_matter'
  | 'earth_experiments'
  | 'quiz_notebook'
  | 'ai_advisor';

export interface MicroscopeSample {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'plant' | 'animal' | 'microbe';
  descriptionAr: string;
  recommendedMagnification: number; // 4, 10, 40, 100
  imageUrl: string;
  realImageUrl?: string;
  keyFeaturesAr: string[];
}

export interface CellOrganelle {
  id: string;
  nameAr: string;
  nameEn: string;
  functionAr: string;
  foundIn: 'both' | 'plant_only' | 'animal_only';
  color: string;
  iconName: string;
}

export interface ChemicalElement {
  id: string;
  symbol: string;
  nameAr: string;
  atomicNumber: number;
  reactivityAr: string;
  reactionSpeedSec: number; // 1 to 10
  gasBubblesIntensity: 'none' | 'low' | 'medium' | 'high' | 'explosive';
  tempChangeC: number;
  color: string;
  notesAr: string;
}

export interface MetalOrNonMetalElement {
  id: string;
  symbol: string;
  nameAr: string;
  type: 'metal' | 'nonmetal';
  color: string;
  hasLuster: boolean;
  isMalleable: boolean;
  lusterDescriptionAr: string;
  malleabilityDescriptionAr: string;
}

export interface QuizQuestion {
  id: string;
  category: ScienceCategory;
  questionAr: string;
  optionsAr: string[];
  correctAnswerIndex: number;
  explanationAr: string;
}

export interface LabNote {
  id: string;
  title: string;
  experimentName: string;
  category: ScienceCategory;
  date: string;
  content: string;
  hypothesis: string;
  conclusion: string;
}

export interface AppStats {
  totalViews: number;
  totalExperimentsRun: number;
  totalQuizCompleted: number;
  totalNotesSaved: number;
  lastVisitedIso: string;
  adClicks: number;
  adSimulationEnabled: boolean;
  adsensePublisherId?: string;
  adsenseAdSlotId?: string;
  isRealAdSenseEnabled?: boolean;
}
