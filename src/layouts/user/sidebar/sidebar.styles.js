import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
// mui
import { Accordion, Paper, Typography } from "@mui/material";

export const SidebarContainer = styled.div`
  display: ${(props) => (props.isopen ? "flex" : "none")};
  position: ${(props) => (props.isopen ? "fixed" : "relative")};
  z-index: 1;
  width: 250px;
  box-shadow: "4px 0px 25px rgba(0, 0, 0, 0.03";
  @media (min-width: 1200px) {
    display: flex;
    flex-shrink: 0;
  }
`;

export const SidebarWrapper = styled(Paper)`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  position: relative;
  box-shadow: "4px 0px 25px rgba(0, 0, 0, 0.03";
  background-image: none;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1 0 auto;
  position: fixed;
  top: 0px;
  outline: currentcolor none 0px;
  left: 0px;
  z-index: 0;
  width: inherit;
  border-radius: 0;
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px 0 38px 20px;
  flex-shrink: 0;
`;

export const SidebarHeaderLogo = styled.div`
  width: 85px;
  display: inline-flex;
`;

export const SidebarHeaderUserDetails = styled(Link)`
  display: flex;
  align-items: center;
  padding: 13px;
  border-radius: 12px;
  background-color: #eceff1;
`;

export const SidebarHeaderUserAvatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  background-color: ${(props) => props.primary};
  color: ${(props) => props.primaryColor};
  font-weight: 600;
`;

export const SidebarNavItem = styled(NavLink)`
  margin: 0px;
  text-decoration: none;
  outline: currentcolor none 0px;
  border: 0px none;
  margin: 0px 0px 10px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  min-width: 0px;
  box-sizing: border-box;
  text-align: left;
  padding: 8px 0 8px 16px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  position: relative;
  text-transform: capitalize;
  height: 50px;
  color: inherit;
  &.active,
  &:not(.active):hover {
    background: ${(props) => props.hovercolor};
    font-weight: 500;
  }
  &.active {
    background: ${(props) => props.activecolor};
    color: ${(props) => props.maincolor};
    &::after {
      content: "";
      background: ${(props) => props.maincolor};
      width: 3px;
      height: inherit;
    }
  }
`;

export const SidebarNavItemDetailIcon = styled.div`
  flex-shrink: 0;
  color: inherit;
  min-width: auto;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const SidebarNavItemDetailNameWrapper = styled.div`
  flex: 1 1 auto;
  min-width: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const SidebarNavItemDetailName = styled(Typography)`
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
`;

export const SidebarUpgradePlan = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -20%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const SidebarSubNavItem = styled(SidebarNavItem)`
  display: flex;
  padding-left: 44px;
  padding-right: 0;
  justify-content: flex-end;
`;

export const SubItemAccordion = styled(Accordion)`
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: inherit;
  color: inherit;
  &.active,
  &:not(.active):hover {
    background-color: ${(props) => props.hovercolor};
    font-weight: 500;
  }
  &.active {
    background-color: ${(props) => props.activecolor};
    color: ${(props) => props.maincolor};
  }
`;
