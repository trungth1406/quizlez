import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            common: {
                save: 'Save',
                delete: 'Delete',
                create: 'Create',
            },
            folders: {
                folders: 'Folders',
            },
            testSets: {
                empty: 'No Test Sets were found. Click on the box below to add a new Test Set',
                add: 'Add new Test Set',
                header: {
                    create: 'Create new Test Set',
                },
                form: {
                    placeHolder: {
                        name: 'Name',
                        description: 'Description',
                    },
                    label: {
                        name: 'Name',
                        description: 'Description',
                        term: 'Term',
                        definition: 'Definition',
                    },
                    definitionCards: {
                        add: 'Add new Definition Card',
                    },
                    errors: {
                        name: 'Name is required',
                        definition: {
                            atLeastOne: 'At least one definition is required',
                        },
                    },
                },
                label: {
                    learn: 'Learn',
                    test: 'Test',
                    term: 'Term',
                    definition: 'Definition',
                },
            },
            breadCrumb: {
                testsets: {
                    current: 'Test Set List',
                    next: 'Test set',
                },
                form: {
                    current: 'Test Set Form',
                    next: '',
                },
            },
        },
    },
    vi: {
        translation: {
            common: {
                save: 'Lưu',
                delete: 'Xóa',
                create: 'Tạo',
            },
            folders: {
                folders: 'Thư mục',
            },
            testSets: {
                empty: 'Không có bộ Học Phần nào tìm thấy. Nhấn vào hộp bên trái để thêm một bộ Học Phần mới',
                add: 'Thêm một bộ Học Phần mới',
                header: {
                    create: 'Tạo  Học Phần mới',
                },
                form: {
                    placeHolder: {
                        name: 'Tiêu đề',
                        description: 'Mô tả',
                    },
                    label: {
                        name: 'Tiêu đề',
                        description: 'Mô tả',
                        term: 'Thuật ngữ',
                        definition: 'Định nghĩa',
                    },
                    definitionCards: {
                        add: 'Thêm Thẻ',
                    },
                    errors: {
                        name: 'Vui lòng nhập tiêu đề cho Học Phần',
                        definition: {
                            atLeastOne: 'Vui lòng nhập ít nhất một định nghĩa',
                        },
                    },
                },
                label: {
                    learn: 'Học',
                    test: 'Kiểm tra',
                    term: 'Thuật ngữ',
                    definition: 'Định nghĩa',
                },
            },
            breadCrumb: {
                testsets: {
                    current: 'Danh sách Học Phần',
                    next: 'Học phần',
                },
                form: {
                    current: 'Tạo một bộ Học Phần mới',
                    next: '',
                },
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
