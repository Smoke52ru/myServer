export type TOneDaySchedule = Array<ILesson>

export interface ILesson {
    auditorium: string;
    auditoriumAmount: number;
    auditoriumOid: number;
    author: string;
    beginLesson: string;
    building: string;
    buildingGid: number;
    buildingOid: number;
    contentOfLoadOid: number;
    contentOfLoadUID?: null;
    contentTableOfLessonsName: string;
    contentTableOfLessonsOid: number;
    createddate: string;
    date: string;
    dateOfNest: string;
    dayOfWeek: number;
    dayOfWeekString: string;
    detailInfo: string;
    discipline: string;
    disciplineOid: number;
    disciplineinplan?: null;
    disciplinetypeload: number;
    duration: number;
    endLesson: string;
    group: string;
    groupOid: number;
    groupUID: string;
    group_facultyoid: number;
    hideincapacity: number;
    isBan: boolean;
    kindOfWork: string;
    kindOfWorkComplexity: number;
    kindOfWorkOid: number;
    kindOfWorkUid: string;
    lecturer: string;
    lecturerCustomUID?: null;
    lecturerEmail: string;
    lecturerOid: number;
    lecturerUID: string;
    lecturer_rank: string;
    lecturer_title: string;
    lessonNumberEnd: number;
    lessonNumberStart: number;
    lessonOid: number;
    listOfLecturers?: (IListOfLecturersEntity)[] | null;
    modifieddate: string;
    note?: null;
    note_description: string;
    parentschedule: string;
    replaces?: null;
    stream?: null;
    streamOid: number;
    stream_facultyoid: number;
    subGroup?: null;
    subGroupOid: number;
    subgroup_facultyoid: number;
    tableofLessonsName: string;
    tableofLessonsOid: number;
    url1: string;
    url1_description: string;
    url2: string;
    url2_description: string;
}

export interface IListOfLecturersEntity {
    lecturer: string;
    lecturerCustomUID?: null;
    lecturerEmail: string;
    lecturerOid: number;
    lecturerUID: string;
    lecturer_rank: string;
    lecturer_title: string;
}
