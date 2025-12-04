export interface Opportunity {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  createdBy: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: string | null;
  perksAndBenefits: string | null;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  isPaid: boolean;
  average_rating: number;
  total_reviews: number;
  engagementType: string;
  paymentOption: {
    currency: string;
    paymentType: string;
  };
}

export interface jobReponseType {
  data: Opportunity[];
  count: number;
  success: boolean;
  message: string;
  errors: object | null;
}
export interface singleJobReponse {
  data: Opportunity;
  count: number;
  success: boolean;
  message: string;
  errors: object | null;
}

export interface searchJobParams {
  q?: string;
  category?: string;
  location?: string;
  isPaid?: boolean;
  page?: number;
  pageSize?: number;
}
