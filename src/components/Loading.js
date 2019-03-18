import React from 'react';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

const overrides = css`
  margin: 0 auto;
  display: block !important;
`;

const Loading = () => (
  <ClipLoader
    css={overrides}
    sizeUnit={"px"}
    size={20}
    loading={true}
    color={"white"}
  />
);

export default Loading;