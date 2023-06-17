export interface Applications {
    id: string,
    applicantName: string, 
    applicantImage: string,
    applicantUsername: string,
    coverLetter: string,
    educationLevel: string
    contactEmail: string
}
export interface ApplicationFormValues{
    id: string,
    coverLetter: string,
    educationLevel: string
}