import React, { useState } from "react";
import styled from "styled-components";

import { Title } from "../../../components/Card/styles/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { Input, TextArea } from "components/globals/Input";


function CollectionCreate() {
    const [id, setID] = useState(null);


    const handleForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (formData.get("password").length < 6) {
            alert("비밀번호는 6자 이상이어야 합니다.");
            return;
        }

        await fetch(process.env.REACT_APP_SERVER + '/api/v2/collection/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get("name").toString(),
                description: formData.get("description").toString(),
                author: formData.get("nickname").toString(),
                password: formData.get("password").toString(),
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setID(data.data.id)
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <Container>
            {id && <Navigate to={`/collection/${id}`} />}
            <Title>컬렉션 만들기</Title>
            <div>
                <Terms>
                    {"🖐️ 닉네임은 신중하게 작성해 주세요. 생성 후에는 수정이 불가능합니다.\n\n⭐️ 컬렉션의 이름과 설명은 생성 후에도 수정이 가능합니다."}
                </Terms>
                <form onSubmit={handleForm}>
                    <SurveyItem>
                        <Label>
                            <InputTitle>컬렉션의 이름</InputTitle>
                            <InputDescription><FontAwesomeIcon icon={faInfoCircle} /> 컬렉션의 이름입니다.</InputDescription>
                            <Input type="text" name="name" placeholder="제목을 입력해 주세요." required/>
                        </Label>
                    </SurveyItem>
                    <SurveyItem>
                        <Label>
                            <InputTitle>닉네임</InputTitle>
                            <InputDescription><FontAwesomeIcon icon={faInfoCircle} /> 생성 후 변경할 수 없습니다.</InputDescription>
                            <Input type="text" name="nickname" placeholder="닉네임을 입력해 주세요." required/>
                        </Label>
                    </SurveyItem>
                    <SurveyItem>
                        <Label>
                            <InputTitle>비밀번호</InputTitle>
                            <InputDescription><FontAwesomeIcon icon={faInfoCircle} /> 컬렉션을 삭제하거나 수정할 때 필요한 비밀번호입니다.</InputDescription>
                            <Input type="password" name="password" placeholder="비밀번호를 입력해 주세요." required/>
                        </Label>
                    </SurveyItem>
                    <SurveyItem>
                        <Label>
                            <InputTitle>컬렉션의 설명</InputTitle>
                            <TextArea name="description" placeholder="설명을 입력해 주세요. "/>
                        </Label>
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
    margin: 0.25em 0;
    color: var(--text);
`;

const InputDescription = styled.span`
    font-size: 0.8em;
    color: var(--link);
    margin: 0.25em 0;
`;

const SurveyItem = styled.div`
    margin: 1em 0;
`;


const Label = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    item-align: center;
    // align-items: center;
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
    background-color: var(--bg);
    border: solid 0.15em var(--border);
    color: var(--text);
`;
const Container = styled.div`
    margin: 1.5em;


    @media (min-width: 768px) {
        max-width: 50%;
    }

    @media (max-width: 768px) {
        max-width: calc(100%-3em);
    }

`;

export default CollectionCreate;