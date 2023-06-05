function getCookie(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, content, time) {
	var updatedCookie=name+'='+encodeURIComponent(content)+'; path=/; expires='+time.toUTCString();
	document.cookie=updatedCookie;
}
//document.cookie.split('; ').filter(item => item.split('=')[0] == name)[0].split('=')[1]