import "reflect-metadata";
import React, { lazy, Fragment, Suspense, useMemo } from "react";
import { useStore } from "./common/config/state/Store";
import { Route, Switch, Redirect } from "react-router-dom";
import { ProgressSpinner } from "./common/components/helpers/ProgressSpinner";
import Header from "./common/components/layout/Header";
import MainContainer from "./common/components/layout/MainContainer";
import Footer from "./common/components/layout/Footer";
const HomePage = lazy(() => import("./pages/home/HomePage"));
const Results = lazy(() => import("./pages/results/Results"));

export default function App() {
  const { state } = useStore();

  return useMemo(() => {
    return (
      <Fragment>
        {state.globalHelper.showSpinner && <ProgressSpinner />}
        <Header />
        <MainContainer>
          <Suspense fallback={<ProgressSpinner />}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/results" component={Results} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Suspense>
        </MainContainer>
        <Footer />
      </Fragment>
    );
  }, [state.globalHelper.showSpinner]);
}
