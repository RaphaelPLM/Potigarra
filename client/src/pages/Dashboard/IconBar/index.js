import React from "react";
import styled from "styled-components";

import ViewListIcon from "@material-ui/icons/ViewList";
import AppsIcon from "@material-ui/icons/Apps";
import { IconButton } from "@material-ui/core";

const IconBarContainer = styled.div`
  display: flex;
  flex-flow: row-reverse;
`;

const StyledIcon = styled(IconButton)`
  color: #37b0db;
`;

export default function IconBar(props) {
  return (
    <IconBarContainer>
      <StyledIcon onClick={() => props.onClick(true)} size="small" aria-label="list">
        <AppsIcon />
      </StyledIcon>
      <StyledIcon onClick={() => props.onClick(false)} size="small" aria-label="list">
        <ViewListIcon />
      </StyledIcon>
    </IconBarContainer>
  );
}
