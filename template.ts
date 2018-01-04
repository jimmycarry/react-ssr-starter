import { appStore } from '@src/AppStore';

export default ({ markup, helmet }) => {
  return `<!doctype html>
  <html ${helmet.htmlAttributes.toString()}>
<head>
	${helmet.title.toString()}
	${helmet.meta.toString()}
    ${helmet.link.toString()}
    <script>
        window.initialState=${JSON.stringify(appStore)};
    </script>
</head>
<body ${helmet.bodyAttributes.toString()}>
	<div id="app">${markup}</div>
	<script src="/static/vendor.bundle.js"></script>
	<script src="/static/client.js"></script>
</body>
</html>`;
}
