import i18next from "i18next";

import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
    ko: {
        translation: {
            warning: {
                region: "이 사이트는 한국의 사용자에게 최적화되어 있습니다. 다른 국가에서 이용하시는 경우, 일부 기능이 제한되거나, 정보가 부정확할 수 있습니다.",
            },
            root: {
                lang: "ko",
                servicename: "LilyDB",
                bannertitle: "LilyDB 2nd Public Beta!",
                bannercontent: "Thank You!",
            },
            meta: {
                title: {
                    noSearch: "검색",
                    search: "\"{{keyword}}\" 검색 결과",
                    library: "라이브러리"
                }
            },
            time: {
                just: "방금 전",
                minute: "1분 전",
                minutes: "{{time}}분 전",
                hour: "1시간 전",
                hours: "{{time}}시간 전",
                day: "1일 전",
                days: "{{time}}일 전",
                week: "1주 전",
                weeks: "{{time}}주 전",
                month: "1달 전",
                months: "{{time}}달 전",
                year: "1년 전",
                years: "{{time}}년 전",
            },
            title: {
                recentseen: "최근 본 작품",
                recentsearch: "최근 검색한 작품",
                random: "이런 작품도 있어요!",
                recommend: "추천 작품",
                similar: "본 작품과 비슷한 태그의 작품",
                popular: "인기 작품",
                likedArticle: "좋아요 표시한 작품",
                likedAuthor: "좋아요 표시한 작가",
                likedCollection: "좋아요 표시한 컬렉션",
                included: "포함된 작품",
                relatedTags: "관련 태그",
                other: "{{name}} 작가님의 다른 작품",
                tagArticle: "태그 별 작품 보기",
                includeTag: "태그가 포함된 작품",
                category: "카테고리",
            },
            vote: {
                error: {
                    duplicated: {
                        dislike: "이미 비추천했습니다.",
                        like: "이미 추천했습니다.",
                    }
                }
            },
            search: {
                tooMany: "검색 결과가 너무 많습니다! ({{articleLength}}개) 검색어를 좀 더 자세히 써보는 건 어떨까요?",
                placeholder: "작품, 작가 또는 컬렉션을 검색해보세요",
                title: {
                    result: "{{count}}개의 검색 결과",
                    articles: "작품",
                    tags: "작품에 포함된 태그",
                    authors: "작가",
                    collections: "컬렉션",
                }
            },
            modal: {
                error: {
                    title: "에러!",
                },
                adult: {
                    title: "잠깐! 성인이신가요?",
                    content: "이 사이트는 미성년자가 이용하기 부적절한 민감한 콘텐츠를 포함하고 있습니다.",
                    button: {
                        yes: "성인 입니다!",
                        no: "성인이 아닙니다",
                    }
                },
                button: {
                    yes: "확인",
                    no: "취소",
                    close: "닫기",
                    apply: "적용",
                }
            },
            card: {
                badge: {
                    warning: "주의",
                    release: {
                        notRelease: "완결"
                    },
                    content: {
                        만화: "만화",
                        소설: "소설",
                        애니메이션: "애니메이션",
                        앤솔로지: "앤솔로지",
                        단편: "단편",
                        웹툰: "웹툰",
                    },
                    ad: "광고",
                },
                button: {
                    general: "일반",
                    single: "단편",
                    fold: {
                        open: "펼치기",
                        close: "접기",
                    }
                },
                warning: {
                    noArticle: "😭 작품이 없습니다!"
                },
                author: {
                    unknown: "Unknown",
                }
            },
            library: {
                title: {
                    myLibrary: "내 라이브러리",
                    otherLibrary: "{{name}}님의 라이브러리",
                },
                tip: {
                    empty: "라이브러리가 비어있습니다.",
                    list: "좋아요를 누른 작품 목록입니다.",
                }
            },
            collection: {
                badge: {
                    collection: "컬렉션",
                },
                info: {
                    view: "조회수",
                    article: "{{count}}개의 작품",
                    created: "만들어진 날짜",
                    updated: "수정된 날짜",
                },
                anchor: {
                    add: "작품 추가 & 수정",
                    edit: "정보 수정",
                    delete: "삭제",
                },
                title: {
                    registered: "등록된 작품",
                    author: "작가",
                    recommend: "추천 작품",
                },
                section: {
                    recommend: {
                        info: "등록 된 작품 기준",
                    }
                },
                modal: {
                    title: "「{{name}}」에 작품 추가",
                    error: {
                        alreadyExist: "이미 등록된 작품입니다.",
                        wrongPassword: "비밀번호가 맞지 않습니다.",
                    },
                    section: {
                        password: {
                            info: "우선, 비밀번호를 입력해주세요.",
                            placeholder: "비밀번호",
                            submit: "확인",
                        },
                        article: {
                            placeholder: "작품을 검색해보세요. (작품 원 제목도 가능)",
                            title: "현재 등록된 작품",
                            info: "작품을 클릭하면 삭제됩니다.",
                        },
                        search: {
                            title: "{{count}}개의 검색 결과",
                            tooMany: "검색 결과가 너무 많습니다! ({{articleLength}}개). 5개 이상의 결과는 표시되지 않습니다.",
                            noResult: "검색 결과가 없습니다.",
                        }
                    }
                }
            },
            article: {
                badge: {
                    release: {
                        notRelease: "완결",
                        release: "연재 중"
                    }
                },
                button: {
                    view: "읽기"
                },
                description: {
                    default: "설명이 없습니다.",
                },
                anchor: {
                    report: "데이터 수정 & 신고",
                    comment: "댓글로",
                    about: "정보로",
                },
                series: {
                    title: "{{series}}의 시리즈",
                }
            },
            author: {
                multi: "여러",
                badge: {
                    author: "작가",
                },
                homepage: {
                    personal: "개인 홈페이지",
                    pixiv: "Pixiv",
                    twitter: "Twitter",
                    facebook: "Facebook",
                    instagram: "Instagram",
                }
            },
            nav: {
                home: "홈",
                search: "검색하기",
                articles: "작품",
                update: "업데이트",
                random: "랜덤 작품 조회",
                library: "라이브러리",
                collection: "컬렉션 만들기",
                setting: "설정",
                light: "라이트 모드",
                dark: "다크 모드",
                more: "더 보기",
            },
            setting: {
                title: "설정",
                cookie: {
                    process: {
                        "title": "쿠키 비우기",
                        "content": "정말로 쿠키를 비우시겠습니까? 이 작업은 되돌릴 수 없습니다.",
                        "process": "쿠키 비우기",
                        "close": "닫기",
                    }
                },
                section: {
                    cookie: {
                        title: "쿠키 비우기",
                        content: "쿠키를 비우면 최근 본 작품, 최근 검색한 작품, 좋아요 표시한 작품 등의 정보가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.",
                        button: "쿠키 비우기",
                    },
                    data: {
                        backup: {
                            title: "데이터 백업",
                            content: "데이터 (좋아요 표시한 작품, 최근 본 작품, 최근 검색한 작품) 등을 백업합니다.",
                            button: "데이터 백업",
                        },
                        restore: {
                            title: "데이터 복원",
                            content: "백업한 데이터로부터 데이터를 복원합니다.",
                            button: "데이터 복원",
                        },
                    },
                    language: {
                        korean: {
                            title: "한국어",
                            content: "사이트 언어를 한국어로 변경합니다.",
                            button: "변경",
                        },
                        japaness: {
                            title: "日本語",
                            content: "サイトの言語を日本語に変更します。",
                            button: "変更",
                        },
                        english: {
                            title: "English",
                            content: "Change the site language to English.",
                            button: "Change",
                        },
                    }
                },
            },
            like: {
                nashi: "좋아요 표시한 작품이 없어요!",
            },
            comment: {
                title: "댓글",
                warning: {
                    timezone: "시간대는 UTC+9 (Seoul, Tokyo) 기준 입니다."
                },
                button: {
                    edit: "수정",
                    delete: "삭제",
                    submit: "등록",
                },
                write: {
                    success: "댓글이 등록되었습니다!",
                    fail: "댓글 등록에 실패했습니다. 다시 시도해주세요.",
                },
                delete: {
                    success: "댓글이 삭제되었습니다!",
                    fail: "댓글 삭제에 실패했습니다. 다시 시도해주세요.",
                },
                input: "댓글 입력하기",
                placeholder: "{{article}} 작품에 관련 된 댓글을 달아주세요!",
                author: "닉네임",
                password: "비밀번호",
                nashi: "😭 댓글이 없어요!",
            },
            publisher: {
                dcinside: "디시인사이드",
                arcalive: "아카라이브",
                ridibooks: "리디북스",
                yes24: "예스24",
                aladin: "알라딘",
                kyobo: "교보문고",
                naver_series: "네이버 시리즈",
                kakao_page: "카카오 페이지",
                bomtoon: "봄툰",
                peanutoon: "피넛툰",
                lezhin: "레진코믹스",
                melonbooks: "멜론북스",
                amazon: "아마존",
                bookwalker: "북워커",
                comic_fuz: "코믹 퍼즈",
            }
        }
    },
    en: {
        translation: {
            warning: {
                region: "This site is not optimized for English speakers. The information on this site is not available in English.",
            },
            tags: {
                "분류 안됨": "Uncategorized",
                "로맨스": "Romance",
                "4컷": "4 Panel Format",
                "청불": "Adult",
                "BDSM": "BDSM",
                "페도": "Loli",
                "일상": "Slice of Life",
                "학원": "Teen",
                "여행": "Travel",
                "OL": "OL",
                "하렘": "Harem",
                "자매": "Sibling",
                "소꿉친구": "Childhood Friend",
                "모녀": "Mother & Daughter",
                "인외": "Anthro",
                "판타지": "Fantasy",
                "다크 판타지": "Dark Fantasy",
                "마법소녀": "Magical Girl",
                "NTR": "NTR",
                "3P+": "3P+",
                "악역영애": "Villainess",
                "남캐": "Male Character",
                "흡혈귀": "Vampire",
                "미래": "Future",
                "군대": "Military",
                "이세계": "Isekai",
                "호러": "Horror",
                "코미디": "Comedy",
                "메이드": "Maid",
                "음악": "Music",
                "범죄": "Crime",
                "SF": "SF",
                "스포츠": "Sport",
                "도박": "Gambling",
                "얀데레": "Yandere",
                "멘헤라": "Menhera",
                "앤솔로지": "Anthology",
            },
            root: {
                lang: "en",
                servicename: "LilyDB",
            },
            meta: {
                title: {
                    noSearch: "Search",
                    search: "Search in {{keyword}}",
                    library: "Library"
                },
            },
            time: {
                just: "Just now",
                minute: "1 minute ago",
                minutes: "{{time}} minutes ago",
                hour: "1 hour ago",
                hours: "{{time}} hours ago",
                day: "1 day ago",
                days: "{{time}} days ago",
                week: "1 week ago",
                weeks: "{{time}} weeks ago",
                month: "1 month ago",
                months: "{{time}} months ago",
                year: "1 year ago",
                years: "{{time}} years ago",
            },
            title: {
                recentseen: "Recent Seen",
                recentsearch: "Recent Search",
                random: "A New Discovery",
                recommend: "Recommend for you",
                similar: "Similar",
                popular: "Popular",
                likedArticle: "Liked Article",
                likedAuthor: "Liked Author",
                likedCollection: "Liked Collection",
                included: "Included Articles",
                relatedTags: "Related Tags",
                other: "{{name}}'s Other Articles",
                tagArticle: "View Articles by tag",
                includeTag: "Articles containing tags",
                category: "Category",
            },
            vote: {
                error: {
                    duplicated: {
                        dislike: "Already disliked.",
                        like: "Already liked.",
                    }
                }
            },
            search: {
                tooMany: "Too many results! ({{articleLength}}) Please be more specific.",
                placeholder: "Search for artworks, artists, or collections!",
                title: {
                    result: "Search Results",
                    articles: "Articles",
                    tags: "Teg included in the Articles",
                    authors: "Authors",
                    collections: "Collections",
                }
            },
            modal: {
                error: {
                    title: "Error",
                },
                adult: {
                    title: "Wait! Are you an adult?",
                    content: "This site contains sensitive content that is inappropriate for minors.",
                    button: {
                        yes: "Yes, I am an adult!",
                        no: "No, I am not an adult.",
                    }
                },
                button: {
                    yes: "Yes",
                    no: "No",
                    close: "Close",
                    apply: "Apply",
                }
            },
            library: {
                title: {
                    myLibrary: "My Library",
                    otherLibrary: "{{name}}'s Library",
                },
                tip: {
                    empty: "Library is empty.",
                    list: "A list of article, author, and collection that you like.",
                }
            },
            collection: {
                badge: {
                    collection: "Collection",
                },
                info: {
                    view: "View",
                    article: "{{count}} Articles",
                    created: "Created",
                    updated: "Updated",
                },
                anchor: {
                    add: "Add Article",
                    edit: "Edit Collection",
                    delete: "Delete Collection",
                },
                title: {
                    registered: "Registered Articles",
                    author: "Authors",
                    recommend: "Recommend Articles",
                },
                section: {
                    recommend: {
                        info: "Based on Registered Articles",
                    }
                },
                modal: {
                    title: "Add article to {{name}}",
                    error: {
                        alreadyExist: "This article is already in the collection.",
                        wrongPassword: "Password does not match.",
                    },
                    section: {
                        password: {
                            info: "Enter the password to edit the article.",
                            placeholder: "Password",
                            submit: "Submit",
                        },
                        article: {
                            placeholder: "Search for articles. (KOR, JPN)",
                            title: "Registered Articles",
                            info: "If you click on the article, it will be removed from the collection.",
                        },
                        search: {
                            title: "{{count}} Search Results",
                            tooMany: "Too many search results! ({{articleLength}}). More than 5 results are not displayed.",
                            noResult: "No results found.",
                        }
                    }
                }
            },
            article: {
                badge: {
                    release: {
                        notRelease: "Completion",
                        release: "Release",
                    }
                },
                button: "Read",
                description: {
                    default: "There is no description.",
                },
                anchor: {
                    report: "Report & Edit Article",
                    comment: "Comment",
                    about: "About",
                },
                series: {
                    title: "{{series}}'s Series",
                }
            },
            author: {
                multi: "Many Author",
                badge: {
                    author: "Author",
                },
                homepage: {
                    personal: "Personal Homepage",
                    pixiv: "Pixiv",
                    twitter: "Twitter",
                    facebook: "Facebook",
                    instagram: "Instagram",
                }
            },
            nav: {
                home: "Home",
                search: "Search",
                articles: "Articles",
                update: "Update",
                random: "Random Article",
                library: "Library",
                collection: "Create Collection",
                setting: "Setting",
                light: "Light Mode",
                dark: "Dark Mode",
                more: "More"
            },
            card: {
                badge: {
                    warning: "Warning",
                    release: {
                        notRelease: "Completion"
                    },
                    content: {
                        만화: "Comic",
                        소설: "Novel",
                        애니메이션: "Animation",
                        앤솔로지: "Anthology",
                        단편: "Short Story",
                        웹툰: "Webtoon",
                    },
                    ad: "Advertisement",
                },
                button: {
                    general: "General",
                    single: "Short Story",
                    fold: {
                        open: "Expand",
                        close: "Collapse",
                    }
                },
                warning: {
                    noTranslate: "The information in this article is not translated into English.",
                    noArticle: "😭 There is no article!",
                }
            },
            setting: {
                title: "Setting",
                cookie: {
                    process: {
                        "title": "Clear Cookies",
                        "content": "Are you sure you want to clear cookies? This action cannot be undone.",
                        "process": "Clear Cookies",
                        "close": "Close",
                    }
                },
                section: {
                    cookie: {
                        title: "Clear Cookies",
                        content: "Clearing cookies will delete information such as recently viewed articles, recently searched articles, and liked articles. This action cannot be undone.",
                        button: "Clear Cookies",
                    },
                    data: {
                        backup: {
                            title: "Data Backup",
                            content: "Back up data (liked articles, recently viewed articles, recently searched articles) and more.",
                            button: "Data Backup",
                        },
                        restore: {
                            title: "Data Restore",
                            content: "Restore data from a backup.",
                            button: "Data Restore",
                        },
                    },
                }
            },
            like: {
                nashi: "You haven't liked any articles yet!",
            },
            comment: {
                title: "Comments",
                warning: {
                    timezone: "The time zone is based on UTC+9 (Seoul, Tokyo)."
                },
                button: {
                    edit: "Edit",
                    delete: "Delete",
                    submit: "Submit",
                },
                write: {
                    success: "Comment has been posted!",
                    fail: "Failed to post comment. Please try again.",
                },
                delete: {
                    success: "Comment has been deleted!",
                    fail: "Failed to delete comment. Please try again.",
                },
                input: "Write a comment",
                placeholder: "Write a comment related to {{article}}!",
                author: "Nickname",
                password: "Password",
                nashi: "😭 No comments!",
            },
            publisher: {
                dcinside: "DCInside",
                arcalive: "Arcalive",
                ridibooks: "Ridibooks",
                yes24: "Yes24",
                aladin: "Aladin",
                kyobo: "Kyobo",
                naver_series: "Naver Series",
                kakao_page: "Kakao Page",
                bomtoon: "Bomtoon",
                peanutoon: "Peanutoon",
                lezhin: "Lezhin",
                melonbooks: "Melonbooks",
                amazon: "Amazon",
                bookwalker: "Bookwalker",
                comic_fuz: "Comic Fuz",
            }
        }
    },
    ja: {
        translation: {
            warning: {
                region: "このサイトは韓国のユーザー向けに最適化されています。一部の機能は制限される可能性があり、翻訳されていない情報も含まれる可能性があります。\n\
                また、サイトの開発者は日本語を母語としていないため、不自然な文や言葉がある可能性があります。もし問題があれば、修正いたしますのでお知らせください。どうもありがとうございます。"
            },
            tags: {
                "분류 안됨": "未分類",
                "로맨스": "ロマンス",
                "4컷": "4コマ",
                "청불": "R18",
                "BDSM": "BDSM",
                "페도": "ロリ",
                "일상": "日常",
                "학원": "学園",
                "여행": "旅行",
                "OL": "OL",
                "하렘": "ハーレム",
                "자매": "姉妹",
                "소꿉친구": "小学校の友達",
                "모녀": "母娘",
                "인외": "人外",
                "판타지": "ファンタジー",
                "다크 판타지": "ダークファンタジー",
                "마법소녀": "魔法少女",
                "NTR": "NTR",
                "3P+": "3P+",
                "악역영애": "悪役令嬢",
                "남캐": "男性キャラクター",
                "흡혈귀": "ヴァンパイア",
                "미래": "未来",
                "군대": "軍隊",
                "이세계": "異世界",
                "호러": "ホラー",
                "코미디": "コメディ",
                "메이드": "メイド",
                "음악": "音楽",
                "범죄": "犯罪",
                "SF": "SF",
                "스포츠": "スポーツ",
                "도박": "ギャンブル",   
                "얀데레": "ヤンデレ",
                "멘헤라": "メンヘラ",
                "앤솔로지": "アンソロジー",
            },
            root: {
                lang: "ja",
                servicename: "LilyDB",
            },
            meta: {
                title: {
                    noSearch: "検索",
                    search: "「{{keyword}}」の検索結果",
                    library: "ライブラリ",
                },
            },
            time: {
                just: "先程",
                minute: "1分前",
                minutes: "{{time}}分前",
                hour: "1時間前",
                hours: "{{time}}時間前",
                day: "1日前",
                days: "{{time}}日前",
                week: "1週間前",
                weeks: "{{time}}週間前",
                month: "1ヶ月前",
                months: "{{time}}ヶ月前",
                year: "1年前",
                years: "{{time}}年前",
            },
            title: {
                recentseen: "最近見た作品",
                recentsearch: "最近検索した作品",
                random: "新しい試み",
                recommend: "おすすめ作品",
                similar: "似た作品",
                popular: "人気作品",
                likedArticle: "いいねした作品",
                likedAuthor: "いいねした作家",
                likedCollection: "いいねしたコレクション",
                included: "含まれている作品",
                relatedTags: "関連タグ",
                other: "{{name}}作家さんの他の作品",
                tagArticle: "タグ別の作品閲覧",
                includeTag: "タグが含まれた作品",
                category: "カテゴリー",
            },
            vote: {
                error: {
                    duplicated: {
                        dislike: "既に推薦しました。",
                        like: "既に非推薦しました。",
                    }
                }
            },
            search: {
                tooMany: "結果が多すぎます! ({{articleLength}}) より具体的に検索してください。",
                placeholder: "作品、作家、またはコレクションを検索してください！",
                title: {
                    result: "検索結果",
                    articles: "作品",
                    tags: "作品に含まれるタグ",
                    authors: "作家",
                    collections: "コレクション",
                },
            },
            modal: {
                error: {
                    title: "エラー",
                },
                adult: {
                    title: "待って！大人ですか？",
                    content: "このサイトには未成年には不適切な内容が含まれています。",
                    button: {
                        yes: "大人です！",
                        no: "大人ではありません。"
                    }
                },
                button: {
                    yes: "はい",
                    no: "いいえ",
                    close: "閉じる",
                    apply: "適用"
                }
            },
            card: {
                badge: {
                    warning: "注意",
                    release: {
                        notRelease: "完結",
                    },
                    content: {
                        만화: "漫画",
                        소설: "小説",
                        애니메이션: "アニメ",
                        앤솔로지: "アンソロジー",
                        단편: "単話",
                        웹툰: "ウェブ漫画",
                    },
                    ad: "広告",
                },
                button: {
                    general: "一般",
                    single: "単話",
                    fold: {
                        open: "開く",
                        close: "閉じる",
                    }
                },
                warning: {
                    noTranslate: "この作品の情報は日本語に翻訳されていません。",
                    noArticle: "😭 作品がありません！",
                }
            },
            library: {
                title: {
                    myLibrary: "マイライブラリー",
                    otherLibrary: "{{name}}さんのライブラリー",
                },
                tip: {
                    empty: "ライブラリが空です。",
                    list: "「いいね」を押した作品、作家、コレクションのリストです。",
                }
            },
            collection: {
                badge: {
                    collection: "コレクション",
                },
                info: {
                    view: "閲覧数",
                    article: "{{count}}個の作品",
                    created: "作成日",
                    updated: "修正日",
                },
                anchor: {
                    add: "作品追加",
                    edit: "コレクションの修正",
                    delete: "削除",
                },
                title: {
                    registered: "登録された作品",
                    author: "作家",
                    recommend: "推薦作品",
                },
                section: {
                    recommend: {
                        info: "登録された作品基盤",
                    }
                },
                modal: {
                    title: "「{{name}}」に作品を追加",
                    error: {
                        alreadyExist: "すでに登録されている作品です。",
                        wrongPassword: "パスワードが正しくありません。",
                    },
                    section: {
                        password: {
                            info: "まず、パスワードを入力してください。",
                            placeholder: "パスワード",
                            submit: "確認",
                        },
                        article: {
                            placeholder: "作品を検索してみてください。",
                            title: "登録されている作品",
                            info: "作品をクリックすると削除されます。",
                        },
                        search: {
                            title: "{{count}}個の検索結果",
                            tooMany: "検索結果が多すぎます！（{{articleLength}}）五つ以上の結果は表示されません。",
                            noResult: "検索結果がありません。",
                        }
                    }
                }
            },
            article: {
                badge: {
                    release: {
                        notRelease: "完結",
                        release: "連載中",
                    }
                },
                button: {
                    view: "読み",
                },
                description: {
                    default: "説明がありません。",
                },
                anchor: {
                    report: "データ修正&届出",
                    comment: "コメント",
                    about: "情報",
                },
                series: {
                    title: "『{{series}}』 のシリーズ",
                }
            },
            author: {
                multi: "作家たち",
                badge: {
                    author: "作者",
                },
                homepage: {
                    personal: "個人サイト",
                    pixiv: "Pixiv",
                    twitter: "Twitter",
                    facebook: "Facebook",
                    instagram: "Instagram",
                }
            },
            nav: {
                home: "ホーム",
                search: "検索",
                articles: "作品",
                update: "アップデート",
                random: "ランダム作品",
                library: "ライブラリ",
                collection: "コレクション作成",
                setting: "設定",
                light: "ライトモード",
                dark: "ダークモード",
                more: "もっと見る"
            },
            setting: {
                title: "設定",
                cookie: {
                    process: {
                        "title": "クッキーを削除",
                        "content": "クッキーを削除してもよろしいですか？この操作は元に戻すことができません。",
                        "process": "クッキーを削除",
                        "close": "閉じる",
                    }
                },
                section: {
                    cookie: {
                        title: "クッキーを削除",
                        content: "クッキーを削除すると、最近見た作品、最近検索した作品、いいねした作品などの情報が削除されます。この操作は元に戻すことができません。",
                        button: "クッキーを削除",
                    },
                    data: {
                        backup: {
                            title: "データバックアップ",
                            content: "データ（いいねした作品、最近見た作品、最近検索した作品）などをバックアップします。",
                            button: "データバックアップ",
                        },
                        restore: {
                            title: "データリストア",
                            content: "バックアップからデータを復元します。",
                            button: "データリストア",
                        },
                    },
                }
            },
            like: {
                nashi: "いいねした作品がありません！",
            },
            comment: {
                title: "コメント",
                warning: {
                    timezone: "時間帯はUTC+9(Seoul、Tokyo)基準です。"
                },
                button: {
                    edit: "編集",
                    delete: "削除",
                    submit: "送信",
                },
                write: {
                    success: "コメントが投稿されました！",
                    fail: "コメントの投稿に失敗しました。もう一度お試しください。",
                },
                delete: {
                    success: "コメントが削除されました！",
                    fail: "コメントの削除に失敗しました。もう一度お試しください。",
                },
                input: "コメントを入力する",
                placeholder: "{{article}}に関するコメントを書いてください！",
                author: "ニックネーム",
                password: "パスワード",
                nashi: "😭 コメントがありません！",
            },
            publisher: {
                dcinside: "DCInside",
                arcalive: "Arcalive",
                ridibooks: "Ridibooks",
                yes24: "Yes24",
                aladin: "Aladin",
                kyobo: "Kyobo",
                naver_series: "Naver Series",
                kakao_page: "Kakao Page",
                bomtoon: "Bomtoon",
                peanutoon: "Peanutoon",
                lezhin: "Lezhin",
                melonbooks: "Melonbooks",
                amazon: "Amazon",
                bookwalker: "Bookwalker",
                comic_fuz: "Comic Fuz",
            }
        }
    }
}
    

i18next.use(initReactI18next).use(LanguageDetector).init({
    resources: resources,
    lang: ["ko", "en", "ja"],
    fallbackLng: "ko",
    interpolation: {
        escapeValue: false,
    }
});

export default i18next;
