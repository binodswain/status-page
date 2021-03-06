import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes} className="flat">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                {props.headComponents}
            </head>
            <body {...props.bodyAttributes} className="light">
                <script
                    key="set-theme"
                    dangerouslySetInnerHTML={{
                        __html: `(function() {
                try {
                  var mode = localStorage.getItem('siteTheme');
                  var supportDarkMode =
                    window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!mode && supportDarkMode)
                    document.body.classList.add('dark');
                  if (!mode) return;
                  document.body.classList.add(mode);
                } catch (e) {
                    console.log(e)
                }
              })();`,
                    }}
                />

                <script
                    key="set-profile"
                    dangerouslySetInnerHTML={{
                        __html: `(function() {
                try {
                  var profile = localStorage.getItem('siteProfile');
                  if (!profile) return;
                  document.documentElement.classList = profile;
                } catch (e) {
                    console.log(e)
                }
              })();`,
                    }}
                />
                {props.preBodyComponents}
                <noscript key="noscript" id="gatsby-noscript">
                    This app works best with JavaScript enabled.
                </noscript>
                <div
                    key={`body`}
                    id="___gatsby"
                    dangerouslySetInnerHTML={{ __html: props.body }}
                />
                {props.postBodyComponents}
            </body>
        </html>
    );
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
};
