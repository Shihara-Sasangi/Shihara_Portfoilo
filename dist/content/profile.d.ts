export type SocialLink = {
    label: string;
    href: string;
};
export type Project = {
    name: string;
    description: string;
    stack: string[];
    href?: string;
};
export type ProjectCategory = {
    title: string;
    summary: string;
    points: string[];
};
export type Experience = {
    role: string;
    company: string;
    period: string;
    highlights: string[];
};
export declare const PROFILE: {
    name: string;
    headline: string;
    location: string;
    summary: string;
    socials: {
        label: string;
        href: string;
    }[];
};
export declare const SKILLS: {
    primary: string[];
    secondary: string[];
};
export declare const EXPERIENCE: Experience[];
export declare const PROFESSIONAL_PROJECTS: ProjectCategory;
export declare const UNIVERSITY_PROJECTS: ProjectCategory;
/** Modules completed as part of the degree (two columns on detail page). */
export declare const ACADEMIC_MODULES: string[];
export type ProfessionalDevelopmentCourse = {
    course: string;
    completed: string;
};
export declare const PROFESSIONAL_DEVELOPMENT_IIT: ProfessionalDevelopmentCourse[];
/** Workshops and programmes (University Participants detail page). */
export declare const UNIVERSITY_PARTICIPANTS_ITEMS: string[];
//# sourceMappingURL=profile.d.ts.map