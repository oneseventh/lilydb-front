import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Select from "react-select";

import { Title } from "../../components/Card/styles/Title";


function Submit() {
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState([]);
    const [category, setCategory] = useState(null);
    const [release, setRelease] = useState(null);

    const fetchTags = useCallback(async () => {
        await fetch(process.env.REACT_APP_SERVER + '/api/v2/tags/')
            .then((response) => response.json())
            .then((data) => {
                data.map((item) => {
                    setTags(tags => [...tags, {"value": item.tag_name, "label": item.tag_name, "color": item.color}]);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const tagOption = () => {
        function handleSelect(data) {
            setValue(data);
        }

        const customStyles = {
            control: (styles, { data }) => {
                return {
                    ...styles,
                    border: "0",
                    borderRadius: "1em",
                    fontSize: "0.8em",
                }
            },
            option: (styles, { data }) => {
                return {
                    ...styles,
                    color: `var(--${data.color})`,
                    opacity: 0.8
                };
            },
            multiValue: (styles, { data }) => {
                return {
                    ...styles,
                    backgroundColor: `var(--${data.color})`,
                    opacity: 0.8,
                    fontSize: "1.2em",
                    borderRadius: "1em",
                };
            },
            multiValueLabel: (styles, { data }) => ({
                ...styles,
                color: "white",
            })
        }

        return (
            <>
                <InputTitle>태그를 선택해 주세요.</InputTitle>
                <Select
                    options={tags}
                    placeholder="태그를 선택해 주세요. (검색 가능)"
                    menuPosition="fixed"
                    menuPlacement="auto"
                    value={value}
                    onChange={handleSelect}
                    styles={customStyles}
                    isSearchable={true}
                    isMulti
                />
            </>
        )
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handleRelease = (e) => {
        setRelease(e.target.value);
    }

    const handleForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        console.log(formData.get("title"));
        console.log(formData.get("author"));
        console.log(value.map((item) => item.value).join(","));
        console.log(category);
        console.log(release);

        fetch(process.env.REACT_APP_SERVER + '/api/v2/article/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData.get("title").toString(),
                author: formData.get("author").toString(),
                tags: value.map((item) => item.value).join(",").toString(),
                is_release: release === "release" ? true : false,
                content_type: category.toString()
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("제출되었습니다.");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchTags(() => {
            
        });
    }, []);

    return (
        <Container>
            <Title>LilyDB 데이터 제출 폼</Title>
            <div style={{ width: "550px", display: "flex", flexDirection: "column", overflow: "hidden"}}>
                <Terms>
                    {"본 설문은 \"입력한 정보\"와, \"사용자 IP\"를 수집합니다.\n수집 목적:\n - 입력한 정보: 제공한 정보를 토대로 데이터베이스에 등록하기 위해 수집합니다.\n - 사용자 IP: 서비스 부정 사용을 방지하기 위해 수집합니다.\n설문을 제출하면, 위의 정보를 수집하는 것에 동의하는 것으로 간주합니다."}
                </Terms>
                <form onSubmit={handleForm}>
                    <SurveyItem>
                        <label>
                            <InputTitle>제목</InputTitle>
                            <StyledInput type="text" name="title" placeholder="제목" />
                        </label>
                    </SurveyItem>
                    <SurveyItem>
                        <label>
                            <InputTitle>작가</InputTitle>
                            <StyledInput type="text" name="author" placeholder="작가 (여러명 일경우 ,로 구분하여 작성. <예: 테스트1, 테스트2> " />
                        </label>
                    </SurveyItem>
                    <SurveyItem>
                        {tagOption()}
                    </SurveyItem>
                    <SurveyItem>
                        <InputTitle>분류를 선택해 주세요</InputTitle>
                        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Label htmlFor="manga"><input id="manga" type="radio" name="type" value="만화" onChange={handleCategory} required/>만화</Label>
                            <Label htmlFor="anthol"><input id="anthol" type="radio" name="type" value="앤솔로지" onChange={handleCategory} />앤솔로지</Label>
                            <Label htmlFor="single"><input id="single" type="radio" name="type" value="단편" onChange={handleCategory} />단편</Label>
                            <Label htmlFor="novel"><input id="novel" type="radio" name="type" value="소설" onChange={handleCategory} />소설</Label>
                            <Label htmlFor="anime"><input id="anime" type="radio" name="type" value="애니메이션" onChange={handleCategory} />애니메이션</Label>
                            <Label htmlFor="webtoon"><input id="webtoon" type="radio" name="type" value="웹툰" onChange={handleCategory} />웹툰</Label>
                        </div>
                    </SurveyItem>
                    <SurveyItem>
                        <InputTitle>상태를 선택해 주세요.</InputTitle>
                        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Label htmlFor="not"><input id="not" type="radio" name="release" value="not" onChange={handleRelease} required/>연재 예정</Label>
                            <Label htmlFor="release"><input id="release"type="radio" name="release" value="release" onChange={handleRelease} />연재 중</Label>
                            <Label htmlFor="end"><input id="end" type="radio" name="release" value="end" onChange={handleRelease} />완결</Label>
                        </div>
                    </SurveyItem>
                    <Button>제출</Button>
                </form>
            </div>
        </Container>
    );
}

const InputTitle = styled.h3`
    font-size: 1.2em;
    font-weight: 600;
    margin: 0.5em 0;
`;

const SurveyItem = styled.div`
    margin: 1em 0;
`;


const Label = styled.label`
    item-align: center;
    align-items: center;
    &>input {
        vertical-align: middle;
        appearance: none;
        border: max(2px, 0.1em) solid gray;
        border-radius: 50%;
        width: 1.25em;
        height: 1.25em;
    }
    &>input:checked {
        border: 0.4em solid var(--primary);
    }
`;

const Button = styled.button`
    border: 0;
    outline: 0;
    padding: 0.75em;
    width: 100%;
    height: 3em;
    margin: 1em 0;
    font-size: 1em;
    border-radius: 1em;
    box-sizing: border-box;
    background-color: var(--primary);
    color: var(--white);
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        filter: brightness(0.8);
        color: var(--white);
    }
`;

const Terms = styled.div`
    white-space: pre-wrap;
    border-radius: 1em;
    padding: 1em;
    background-color: #1c1c1c;
    color: #ccc;
`;
const Container = styled.div`
    margin: 1.5em;
`;

const StyledInput = styled.input`
    width: 100%;
    background-color: var(--white);
    border: 0;
    outline: 0;
    padding: 0.75em;
    height: 3em;
    margin: 0.3em 0;
    font-size: 0.8em;
    border-radius: 1em;
    box-sizing: border-box;
`;

export default Submit;