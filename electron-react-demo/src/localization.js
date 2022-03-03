
import LocalizedStrings from 'react-localization';

let loc = new LocalizedStrings({
    en: {

    },
    ar: {
        employees: "الموظفين",
        addEmployee: "اضافة موظف",
        settings: "الاعدادات",
        EmployeesPage: "صفحة الموظفين",
        EmployeeName: "اسم الموظف",
        nationality: 'الجنسية',
        phoneNumber: "رقم الهاتف"
    }
});

loc.setLanguage('ar');
export default loc;