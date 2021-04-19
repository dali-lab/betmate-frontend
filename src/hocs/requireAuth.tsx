/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType } from 'react';

export interface RequireAuthProps {
  SuccessComp: ComponentType,
  FailureComp: ComponentType,
  isAuthenticated: boolean
}

/**
 * A function that takes two components and displays
 * <SuccessComp /> if the user is authenticated or
 * <FailureComp /> if the user is not authenticated
 */
const RequireAuthHOC = ({
  SuccessComp, FailureComp, isAuthenticated, ...props
}: RequireAuthProps): JSX.Element => {
  return isAuthenticated
    ? <SuccessComp {...props}/>
    : <FailureComp {...props} />;
};

export default RequireAuthHOC;
