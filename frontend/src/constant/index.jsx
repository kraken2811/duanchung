// export const EmployeeStatus = {
//   Active: 'active',
//   Inactive: 'inactive',
// } as const;

// export const BatchStatus = {
//   InProgress: 'in_progress',
//   Failed: 'failed',
//   Passed: 'passed',
//   Ready: 'ready',
//   NotReady: 'not_ready',
//   InReview: 'in_review',
// } as const;
// export const BatchLevel = {
//   easy: 1,
//   medium: 2,
//   hard: 3,
// } as const;

// export type BatchLevelKey = keyof typeof BatchLevel;
// export type BatchLevelValue = (typeof BatchLevel)[BatchLevelKey];
// export type EmployeeStatusType = (typeof EmployeeStatus)[keyof typeof EmployeeStatus];
// export type BatchStatusType = (typeof BatchStatus)[keyof typeof BatchStatus];
// export type BatchLevelType = (typeof BatchLevel)[keyof typeof BatchLevel];

// export const EMPLOYEE_STATUS_DISPLAY: Record<EmployeeStatusType, string> = {
//   [EmployeeStatus.Active]: 'Active',
//   [EmployeeStatus.Inactive]: 'Inactive',
// };
// export const BATCH_STATUS_DISPLAY: Record<BatchStatusType, string> = {
//   [BatchStatus.InProgress]: 'In Progress',
//   [BatchStatus.Failed]: 'Failed',
//   [BatchStatus.Passed]: 'Passed',
//   [BatchStatus.Ready]: 'Ready',
//   [BatchStatus.NotReady]: 'Not Ready',
//   [BatchStatus.InReview]: 'In Review',
// };
// export const BATCH_LEVEL_DISPLAY: Record<BatchLevelValue, string> = {
//   1: 'Easy',
//   2: 'Medium',
//   3: 'Hard',
// };
// export const EmployeeRole = {
//   Admin: 'admin',
//   Labeller: 'labeller',
//   Reviewer: 'reviewer',
// } as const;

// export type EmployeeRoleType = (typeof EmployeeRole)[keyof typeof EmployeeRole];

// export const EMPLOYEE_ROLE_DISPLAY: Record<EmployeeRoleType, string> = {
//   [EmployeeRole.Admin]: 'Admin',
//   [EmployeeRole.Labeller]: 'Labeller',
//   [EmployeeRole.Reviewer]: 'Reviewer',
// };

// export const ExperienceLevel = {
//   New: 'new',
//   LessExperienced: 'less_experienced',
//   Experienced: 'experienced',
// } as const;

// export type ExperienceLevelType = (typeof ExperienceLevel)[keyof typeof ExperienceLevel];

// export const EXPERIENCE_LEVEL_DISPLAY: Record<ExperienceLevelType, string> = {
//   [ExperienceLevel.New]: 'New',
//   [ExperienceLevel.LessExperienced]: 'Less Experienced',
//   [ExperienceLevel.Experienced]: 'Experienced',
// };

// /* Assignment Progress Status */
// export const AssignmentProgressStatus = {
//   Ready: 'ready',
//   Not_Ready: 'not_ready',
// } as const;

// export type AssignmentProgressStatusType =
//   (typeof AssignmentProgressStatus)[keyof typeof AssignmentProgressStatus];

// export const ASSIGNMENT_PROGRESS_STATUS_DISPLAY: Record<AssignmentProgressStatusType, string> = {
//   [AssignmentProgressStatus.Ready]: 'Ready',
//   [AssignmentProgressStatus.Not_Ready]: 'Not Ready',
// };
// export const AccountStatus = {
//   Available: 'available',
//   Assigned: 'taken',
// } as const;

// export type AccountStatusType = (typeof AccountStatus)[keyof typeof AccountStatus];

// export const ACCOUNT_STATUS_DISPLAY: Record<AccountStatusType, string> = {
//   [AccountStatus.Available]: 'Available',
//   [AccountStatus.Assigned]: 'Assigned',
// };

// export const AccountRole = {
//   Labeller: 'labeller',
//   Reviewer: 'reviewer',
// } as const;

// export type AccountRoleType = (typeof AccountRole)[keyof typeof AccountRole];

// export const ACCOUNT_ROLE_DISPLAY: Record<AccountRoleType, string> = {
//   [AccountRole.Labeller]: 'Labeller',
//   [AccountRole.Reviewer]: 'Reviewer',
// };
