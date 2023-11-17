import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { ResponsiveValue } from "@chakra-ui/styled-system";
import React, { useState } from "react";

interface IAppInputProp {
  placeholder: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type: React.HTMLInputTypeAttribute | undefined;
  letterSpacing: ResponsiveValue<number> | string | undefined;
  prefixIcon: React.ReactElement | undefined;
  suffixIcon: React.ReactElement | undefined;
}

export default function AppInput(props: IAppInputProp) {
  const [isFocus, setFocus] = useState<boolean>(false);
  return !props.prefixIcon || !props.suffixIcon ? (
    <InputGroup>
      {props.prefixIcon ? (
        <InputLeftElement
          fontSize={"22px"}
          color={isFocus ? "primaryColor" : "forthColor"}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          {props.prefixIcon}
        </InputLeftElement>
      ) : null}
      <Input
        type={props.type}
        onChange={props.onChange}
        onFocus={props.prefixIcon ? () => setFocus(true) : undefined}
        onBlur={props.prefixIcon ? () => setFocus(false) : undefined}
        variant={"flushed"}
        focusBorderColor="primaryColor"
        placeholder={props.placeholder}
        fontSize={"18px"}
        borderColor={"#E2E2E2"}
        letterSpacing={props.letterSpacing}
      />
      {props.prefixIcon ? (
        <InputRightElement
          fontSize={"22px"}
          color={"forthColor"}
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
        >
          {props.suffixIcon}
        </InputRightElement>
      ) : null}
    </InputGroup>
  ) : (
    <Input
      type={props.type}
      onChange={props.onChange}
      variant={"flushed"}
      focusBorderColor="primaryColor"
      placeholder={props.placeholder}
      fontSize={"18px"}
      borderColor={"#E2E2E2"}
      letterSpacing={props.letterSpacing}
    />
  );
}

AppInput.defaultProps = {
  placeholder: "",
  onChange: undefined,
  type: "text",
  letterSpacing: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined,
};
