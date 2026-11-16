import { CertificationModel } from './CertificationModel';
import { EducationModel } from './EducationModel';
import { ExperienceModel } from './ExperienceModel';

export interface CareerModel {
    experiences: ExperienceModel[],
    education: EducationModel[],
    certifications: CertificationModel[]
}
