import React, { useState } from 'react'
// import 'antd/dist/antd.css';
import 'phoenix-neumorphism-ui/dist/index.css'
import { Button, Container, ButtonIcon, overrideThemeVariables,lightTheme,darkTheme } from 'phoenix-neumorphism-ui';
// import { AiFillAccountBook } from "react-icons/ai";
import { DiReact } from "react-icons/di";
// import  MateButton from '@material-ui/core/Button';
// import { Button as AntdButton } from 'antd';
const ButtonExample = () => {
    const [islight, setIslight] = useState<Boolean>(true)
    const onClick = () => {
        if(islight){
            overrideThemeVariables(lightTheme)
        }else{
            overrideThemeVariables(darkTheme)
        }
        setIslight(!islight)
    }

    return (
        <Container>
        <div style={{
            paddingTop: "1rem",
            width: "50%",
            height: "100vh",
            display: "grid",
            gap: "3rem 1rem",
            gridTemplateColumns:"10rem 10rem 10rem",
            gridTemplateRows:"4rem 4rem 4rem",
            gridAutoRows:"4rem"
        }}>

                <Button size="small" onClick={onClick}>CLICK</Button>
                <Button size="medium">CLICK</Button>
                <Button size="large">CLICK</Button>
                <Button size="small"  prefixIcon={<DiReact/>}>CLICK</Button>
                <Button size="medium" prefixIcon={<DiReact/>}>CLICK</Button>
                <Button size="large" prefixIcon={<DiReact/>}>CLICK</Button>
                <Button size="small"  suffixIcon={<DiReact/>}>CLICK</Button>
                <Button size="medium" suffixIcon={<DiReact/>}>CLICK</Button>
                <Button size="large" suffixIcon={<DiReact/>}>CLICK</Button>
                <ButtonIcon size="small"><DiReact/></ButtonIcon>
                <ButtonIcon size="medium"><DiReact/></ButtonIcon>
                <ButtonIcon size="large"><DiReact/></ButtonIcon>
                <ButtonIcon size="small" shape="rounded"><DiReact/></ButtonIcon>
                <ButtonIcon size="medium" shape="rounded"><DiReact/></ButtonIcon>
                <ButtonIcon size="large" shape="rounded"><DiReact/></ButtonIcon>
        </div>
            </Container>
    )
}

export default ButtonExample
