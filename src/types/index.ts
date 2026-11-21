export type UnitId = 'unit1' | 'unit2' | 'unit3' | 'unit4';
export type AppMode = 'home' | 'microscope' | 'unit1' | 'unit2' | 'unit3' | 'unit4' | 'textbook' | 'quiz';
export type Unit2SubView = 'catapult' | 'kinetic' | 'gears';

export interface UnitInfo {
  id: UnitId;
  unitNumber: number;
  title: string;
  shortTitle: string;
  iconName: string;
}

export interface Organelle {
  id: string;
  arabicName: string;
  englishName: string;
  function: string;
  presence: string;
  color: string;
  iconType: string;
  isPlant: boolean;
  isAnimal: boolean;
}

export interface OrganelleInfo {
  id: string;
  arabicName: string;
  englishName: string;
  function: string;
  presence: 'both' | 'plant' | 'animal';
  color: string;
  x: number;
  y: number;
  radius?: number;
}

export interface MaterialTest {
  id: string;
  name: string;
  type: 'conductor' | 'insulator';
  description: string;
  icon: string;
}

export interface ExperimentInfo {
  id: string;
  title: string;
  subtitle: string;
  reactants: string[];
  products: string[];
  equation: string;
  color: string;
  tempChange: number;
  ph: number;
  gasProduced: string | null;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TextbookPage {
  id: string;
  pageNumber: number;
  unitId: UnitId;
  unitTitle: string;
  lessonTitle: string;
  mainIdea: string;
  keyConcepts: string[];
  vocabulary: { term: string; definition: string }[];
  explorationActivity: {
    title: string;
    objective: string;
    materials: string[];
    steps: string[];
    conclusion: string;
  };
  thinkAndAnswer: {
    question: string;
    answer: string;
  };
  lessonReviewQuestions: {
    q: string;
    a: string;
  }[];
  labTargetUnit: UnitId;
}
