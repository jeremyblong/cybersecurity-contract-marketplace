import '../styles/bootstrap.min.css';
import '../styles/animate.css';
import '../styles/boxicons.min.css';
import '../styles/flaticon.css';
import '../node_modules/react-modal-video/css/modal-video.min.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import '../styles/style.css';
import '../styles/responsive.css';
import 'react-notifications/lib/notifications.css';


import { RecoilRoot } from 'recoil'
import App from 'next/app';
import Head from 'next/head';
import Layout from '../components/_App/Layout';
import { NotificationContainer } from 'react-notifications';
import Root from "../admin/src/index.jsx";
import { store, persistor } from "../redux/store/store.js";
import { Provider, PersistGate } from "react-redux";
import { shiftCoreStyles } from "../redux/actions/universal/index.js";

class MyApp extends App {
constructor(props) {
    super(props);

    this.state = {
        rehydrated: false
    }
}
    render () {
        const { Component, pageProps } = this.props
        return (
            <Provider store={store}>
                <RecoilRoot>
                    <Layout>
                        <Head>
                            <meta charSet="utf-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                        </Head>
                        <NotificationContainer/>
                        <Component {...pageProps} />
                        <Root />
                    </Layout>
                </RecoilRoot>
            </Provider>
        );
    }
}
export default connect(null, { shiftCoreStyles })(MyApp);