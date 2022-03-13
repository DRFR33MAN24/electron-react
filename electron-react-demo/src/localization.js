import LocalizedStrings from "react-localization";

let loc = new LocalizedStrings({
  en: {},
  ar: {
    employees: "الموظفين",
    addEmployee: "اضافة موظف",
    settings: "الاعدادات",
    EmployeesPage: "صفحة الموظفين",
    EmployeeName: "اسم الموظف",
    nationality: "الجنسية",
    phoneNumber: "رقم الهاتف",
    id: "صورة شخصية",
    dragUploadFile: "اضغط او اسحب لاضافة صورة",
    employee: "موظف",
    employeeType: "نوع الموظف",
    choose: "اختر",
    manager: "مدير",
    save: "حفظ",
    cancel: "الغاء",
    id: "الرقم"
  }
});

loc.setLanguage("ar");
export default loc;
