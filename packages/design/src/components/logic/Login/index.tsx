import {
  AppConfig,
  configKeplr,
  loadKeplrWallet,
  loadLedgerWallet,
  loadOrCreateWallet,
  RedirectLocation,
  useError,
  useSdk,
  WalletLoader,
}//@ts-ignore 
from "@cosmicdapp/logic";
import { GlobalOutlined, AimOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageLayout } from "../../layout/PageLayout";
import { Loading } from "../../logic/Loading";
import { ErrorText, CenterBox, LightText, MainStack, WelcomeStack } from "./style";

const { Title } = Typography;

function disableLedgerLogin() {
  const anyNavigator: any = navigator;
  return !anyNavigator?.usb;
}

function disableKeplrLogin() {
  // TODO find check that works on reload
  //const anyWindow: any = window;
  //return !(anyWindow.getOfflineSigner && anyWindow.keplr.experimentalSuggestChain);
  return false;
}

interface LoginProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  readonly pathAfterLogin: string;
  readonly appName: string;
  readonly appLogo: string;
  readonly config: AppConfig;
}

export function Login({ config, pathAfterLogin, appName, appLogo, ...restProps }: LoginProps): JSX.Element {
  const history = useHistory();
  const state = history.location.state as RedirectLocation;
  const { error, setError, clearError } = useError();
  const sdk = useSdk();

  const [initializing, setInitializing] = useState(false);

  async function init(loadWallet: WalletLoader) {
    setInitializing(true);
    clearError();

    try {
      const signer = await loadWallet(config.chainId, config.addressPrefix);
      sdk.init(signer);
    } catch (error) {
      console.error(error);
      setError(Error(`${error}`).message);
      setInitializing(false);
    }
  }

  async function initBrowser() {
    await init(loadOrCreateWallet);
  }

  async function initLedger() {
    await init(loadLedgerWallet);
  }

  async function initKeplr() {
    const anyWindow: any = window;
    try {
      await anyWindow.keplr.experimentalSuggestChain(configKeplr(config));
      await anyWindow.keplr.enable(config.chainId);
      await init(loadKeplrWallet);
    } catch (error) {
      console.error(error);
      setError(Error(`${error}`).message);
    }
  }

  useEffect(() => {
    if (!sdk.initialized) return;

    if (state) {
      history.push(state.redirectPathname, state.redirectState);
    } else {
      history.push(pathAfterLogin);
    }
  }, [sdk.initialized, state, history]);

  return initializing ? (
    <Loading loadingText="Initializing app..." />
  ) : (
    <PageLayout {...restProps}>
      <MainStack>
        <img src={appLogo} alt="dApp logo" />
        <WelcomeStack>
          <Typography>
            <Title level={2}>Hello!</Title>
            <LightText>Welcome to {appName}</LightText>
            <LightText>Select one of the following options to start:</LightText>
          </Typography>
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="primary" onClick={initBrowser} style={{display: "none"}}>
            Browser (Demo)
          </Button>
          <Button type="primary" disabled={disableLedgerLogin()} onClick={initLedger}>
            <AimOutlined /> Ledger (Secure, Chrome)
          </Button>
          <Button type="primary" disabled={disableKeplrLogin()} onClick={initKeplr}>
            <GlobalOutlined /> Keplr (Secure)
          </Button>
        </WelcomeStack>
        <CenterBox>
          <Avatar src="/Volumes/External/Workspace/github/dApps-1/packages/native-staking/src/App/components/AccountMenu/assets/avatar.svg" /> by Highlander Nodes & qf3i3k
        </CenterBox>
      </MainStack>
    </PageLayout>
  );
}
