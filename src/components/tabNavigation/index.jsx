import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';

// mui
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, useTheme, Tooltip, Stack } from '@mui/material';

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const TabNavigation = ({
  tabs = [],
  data,
  tabName = '',
  tabType = 'path',
  styleDetails = {},
  children,
  subtab,
}) => {
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    palette: { grey, primary },
  } = useTheme();

  const currentPath = pathname.split('/').at(-1);

  const handleTabChange = (param) => {
    searchParams.set(tabName, param);
    setSearchParams(searchParams);
  };

  const currentParam = searchParams.get(tabName) || tabs?.[0]?.value;

  const currentTab =
    tabs.filter(
      (tab) => tab.value === (tabType === 'params' ? currentParam : currentPath)
    )?.length > 0;

  return (
    <Box sx={{ width: '100%' }} typography={'body3'}>
      <TabContext
        value={
          currentTab && tabType === 'params'
            ? currentParam
            : currentTab
            ? currentPath
            : 'overview'
        }
      >
        <Stack
          direction={'row'}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            fontSize: 'inherit',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TabList variant='scrollable' aria-label={`${tabName} tabs`}>
            {tabs.map(({ styleDetails = {}, ...tab }, key) =>
              tabType === 'params' ? (
                <Tab
                  key={key}
                  onClick={() => handleTabChange(tab.value)}
                  icon={
                    tab.badge || tab.badge == 0 ? (
                      <span
                        className='counter'
                        style={
                          currentPath === tab.value
                            ? {
                                backgroundColor: primary.main,
                                color: grey['0'],
                              }
                            : {}
                        }
                      >
                        {tab.badge}
                      </span>
                    ) : (
                      <></>
                    )
                  }
                  iconPosition='end'
                  label={
                    <Tooltip
                      disableFocusListener
                      enterDelay={500}
                      title={tab.tooltip || ''}
                    >
                      <span>{tab.label}</span>
                    </Tooltip>
                  }
                  value={tab.value}
                  {...a11yProps(key)}
                />
              ) : (
                <Tab
                  key={key}
                  sx={{ fontSize: 'inherit' }}
                  LinkComponent={Link}
                  to={tab.value}
                  icon={
                    tab.badge || tab.badge == 0 ? (
                      <span
                        className='counter'
                        style={
                          currentPath === tab.value
                            ? {
                                backgroundColor: primary.main,
                                color: grey['0'],
                              }
                            : {}
                        }
                      >
                        {tab.badge}
                      </span>
                    ) : (
                      <></>
                    )
                  }
                  iconPosition='end'
                  label={
                    <Tooltip
                      disableFocusListener
                      enterDelay={500}
                      title={tab.tooltip || ''}
                    >
                      <span>{tab.label}</span>
                    </Tooltip>
                  }
                  value={tab.value}
                  {...a11yProps(key)}
                />
              )
            )}
          </TabList>
          {subtab}
        </Stack>
        {tabs.map((tab, key) => (
          <TabPanel className='px-0' key={key} value={tab.value}>
            {tab.content ? (
              <tab.content {...data} />
            ) : children ? (
              children
            ) : (
              <Outlet context={data} />
            )}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TabNavigation;
