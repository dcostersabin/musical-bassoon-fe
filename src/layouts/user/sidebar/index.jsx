import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout} from "../../../pages/auth/redux/auth.slice"
import {apiSlice,apiTags} from "../../../app/apiSlice"
// mui
import { GroupOutlined, LogoutOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
// styles
import {
  SidebarContainer,
  SidebarWrapper,
  SidebarHeader,
  SidebarHeaderLogo,
  SidebarNavItemDetailNameWrapper,
  SidebarNavItemDetailName,
  SidebarNavItemDetailIcon,
  SidebarNavItem,
} from "./sidebar.styles";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpenSidebar }) => {
  const {
    palette: { grey, primary },
  } = useTheme();

  const dispatch = useDispatch();
  const sidebarList = [
    {
      name: "Users",
      path: "/dashboard/home",
      icon: <GroupOutlined />,
      role: 1,
    },
    {
      name: "Logout",
      icon: < LogoutOutlined />,
      role:0,
      clickEvent:()=>{dispatch(apiSlice.util.resetApiState());dispatch(apiSlice.util.invalidateTags(apiTags));dispatch(logout())},
    }
  ];

  const {user} = useSelector(state => state.auth);

  return (
    <SidebarContainer isopen={isOpenSidebar}>
      <SidebarWrapper>
        <SidebarHeader>
          <Link
            className="d-flex flex-row align-items-baseline flex-wrap gap-2"
            to="/dashboard/home"
          >
            <SidebarHeaderLogo>Logo</SidebarHeaderLogo>
          </Link>
        </SidebarHeader>
        <div className="d-flex flex-column">
          <ul className="m-0">
            {sidebarList.filter(item => (item?.role === user?.role) || (item.role == 0)).map(({ show = true, ...item }, key) => (

              <SidebarNavItem
                onClick={()=>item.clickEvent? item.clickEvent():null}
                hovercolor={grey[100]}
                activecolor={
                  "linear-gradient(90deg, rgba(255, 240, 235, 0.3) 1.36%, rgba(255, 209, 195, 0.5) 100%)"
                }
                maincolor={primary.main}
                className="d-flex"
                to={item.path}
                key={key}
              >
                <SidebarNavItemDetailIcon>{item.icon}</SidebarNavItemDetailIcon>
                <SidebarNavItemDetailNameWrapper>
                  <SidebarNavItemDetailName variant="body1">
                    {item.name}
                  </SidebarNavItemDetailName>
                </SidebarNavItemDetailNameWrapper>
              </SidebarNavItem>
            ))}
          </ul>
        </div>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
