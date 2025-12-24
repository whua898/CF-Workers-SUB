var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js whua
var mytoken = "auto";
var guestToken = "";
var BotToken = "";
var ChatID = "";
var TG = 0;
var FileName = "CF-Workers-SUB";
var SUBUpdateTime = 6;
var total = 99;
var timestamp = 41023296e5;
var MainData = ``;
var urls = [];
var subConverter = "SUBAPI.cmliussss.net";
var subConfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini";
var subProtocol = "https";
var worker_default = {
  async fetch(request, env) {
    const userAgentHeader = request.headers.get("User-Agent");
    const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
    const url = new URL(request.url);
    
    // 【修改 1A】解析配置名称和 Token
    const urlPath = url.pathname.split("/").filter(p => p); // [配置名, token, ...] 或 [token]
    let token = url.searchParams.get("token");
    let subKey = "main"; // 默认配置名

    if (urlPath.length === 1) {
        token = token || urlPath[0]; // 可能是 /token
        subKey = "main";
    } else if (urlPath.length >= 2) {
        subKey = urlPath[0]; // /配置名/token -> 配置名
        token = token || urlPath[1]; // /配置名/token -> token
    }
    // End 【修改 1A】
    
    mytoken = env.TOKEN || mytoken;
    BotToken = env.TGTOKEN || BotToken;
    ChatID = env.TGID || ChatID;
    TG = env.TG || TG;
    subConverter = env.SUBAPI || subConverter;
    if (subConverter.includes("http://")) {
      subConverter = subConverter.split("//")[1];
      subProtocol = "http";
    } else {
      subConverter = subConverter.split("//")[1] || subConverter;
    }
    subConfig = env.SUBCONFIG || subConfig;
    FileName = env.SUBNAME || FileName;
    const currentDate = /* @__PURE__ */ new Date();
    currentDate.setHours(0, 0, 0, 0);
    const timeTemp = Math.ceil(currentDate.getTime() / 1e3);
    const fakeToken = await MD5MD5(`${mytoken}${timeTemp}`);
    guestToken = env.GUESTTOKEN || env.GUEST || guestToken;
    if (!guestToken) guestToken = await MD5MD5(mytoken);
    const \u8BBF\u5BA2\u8BA2\u9605 = guestToken;
    let UD = Math.floor((timestamp - Date.now()) / timestamp * total * 1099511627776 / 2);
    total = total * 1099511627776;
    let expire = Math.floor(timestamp / 1e3);
    SUBUpdateTime = env.SUBUPTIME || SUBUpdateTime;
    
    // 【修改 1B】更新权限判断
    if (!([mytoken, fakeToken, \u8BBF\u5BA2\u8BA2\u9605].includes(token) || url.pathname.includes("/" + mytoken) || url.pathname.includes("/" + subKey + "/" + mytoken))) {
      if (TG == 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico") await sendMessage(`#\u5F02\u5E38\u8BBF\u95EE ${FileName}`, request.headers.get("CF-Connecting-IP"), `UA: ${userAgentHeader}</tg-spoiler>
\u57DF\u540D: ${url.hostname}
<tg-spoiler>\u5165\u53E3: ${url.pathname + url.search}</tg-spoiler>`);
      if (env.URL302) return Response.redirect(env.URL302, 302);
      else if (env.URL) return await proxyURL(env.URL, url);
      else return new Response(await nginx(), {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=UTF-8"
        }
      });
    } else {
      // 【修改 1C】更新 KV Key
      const KV_KEY = `LINK.${subKey}.txt`; // <--- 使用 subKey 作为 KV Key 的一部分
      if (env.KV) {
        await \u8FC1\u79FB\u5730\u5740\u5217\u8868(env, "LINK.txt", KV_KEY); // 从旧的 "LINK.txt" 迁移
        if (userAgent.includes("mozilla") && !url.search) {
          await sendMessage(`#\u7F16\u8F91\u8BA2\u9605 ${FileName}`, request.headers.get("CF-Connecting-IP"), `UA: ${userAgentHeader}</tg-spoiler>
\u57DF\u540D: ${url.hostname}
<tg-spoiler>\u5165\u53E3: ${url.pathname + url.search}</tg-spoiler>`);
          return await KV(request, env, KV_KEY, \u8BBF\u5BA2\u8BA2\u9605); // <--- 传入新的 KV Key
        } else {
          MainData = await env.KV.get(KV_KEY) || MainData; // <--- 使用新的 KV Key 读取数据
        }
      } else {
        MainData = env.LINK || MainData;
        if (env.LINKSUB) urls = await ADD(env.LINKSUB);
      }
      let \u91CD\u65B0\u6C47\u603B\u6240\u6709\u94FE\u63A5 = await ADD(MainData + "\n" + urls.join("\n"));
      let \u81EA\u5EFA\u8282\u70B9 = "";
      let \u8BA2\u9605\u94FE\u63A5 = "";
      for (let x of \u91CD\u65B0\u6C47\u603B\u6240\u6709\u94FE\u63A5) {
        if (x.toLowerCase().startsWith("http")) {
          \u8BA2\u9605\u94FE\u63A5 += x + "\n";
        } else {
          \u81EA\u5EFA\u8282\u70B9 += x + "\n";
        }
      }
      MainData = \u81EA\u5EFA\u8282\u70B9;
      urls = await ADD(\u8BA2\u9605\u94FE\u63A5);
      await sendMessage(`#\u83B7\u53D6\u8BA2\u9605 ${FileName}`, request.headers.get("CF-Connecting-IP"), `UA: ${userAgentHeader}</tg-spoiler>
\u57DF\u540D: ${url.hostname}
<tg-spoiler>\u5165\u53E3: ${url.pathname + url.search}</tg-spoiler>`);
      const isSubConverterRequest = request.headers.get("subconverter-request") || request.headers.get("subconverter-version") || userAgent.includes("subconverter");
      let \u8BA2\u9605\u683C\u5F0F = "base64";
      if (!(userAgent.includes("null") || isSubConverterRequest || userAgent.includes("nekobox") || userAgent.includes("CF-Workers-SUB".toLowerCase()))) {
        if (userAgent.includes("sing-box") || userAgent.includes("singbox") || url.searchParams.has("sb") || url.searchParams.has("singbox")) {
          \u8BA2\u9605\u683C\u5F0F = "singbox";
        } else if (userAgent.includes("surge") || url.searchParams.has("surge")) {
          \u8BA2\u9605\u683C\u5F0F = "surge";
        } else if (userAgent.includes("quantumult") || url.searchParams.has("quanx")) {
          \u8BA2\u9605\u683C\u5F0F = "quanx";
        } else if (userAgent.includes("loon") || url.searchParams.has("loon")) {
          \u8BA2\u9605\u683C\u5F0F = "loon";
        } else if (userAgent.includes("clash") || userAgent.includes("meta") || userAgent.includes("mihomo") || url.searchParams.has("clash")) {
          \u8BA2\u9605\u683C\u5F0F = "clash";
        }
      }
      let subConverterUrl;
      let \u8BA2\u9605\u8F6C\u6362URL = `${url.origin}/${await MD5MD5(fakeToken)}?token=${fakeToken}`;
      let req_data = MainData;
      let \u8FFD\u52A0UA = "v2rayn";
      if (url.searchParams.has("b64") || url.searchParams.has("base64")) \u8BA2\u9605\u683C\u5F0F = "base64";
      else if (url.searchParams.has("clash")) \u8FFD\u52A0UA = "clash";
      else if (url.searchParams.has("singbox")) \u8FFD\u52A0UA = "singbox";
      else if (url.searchParams.has("surge")) \u8FFD\u52A0UA = "surge";
      else if (url.searchParams.has("quanx")) \u8FFD\u52A0UA = "Quantumult%20X";
      else if (url.searchParams.has("loon")) \u8FFD\u52A0UA = "Loon";
      const \u8BA2\u9605\u94FE\u63A5\u6570\u7EC4 = [...new Set(urls)].filter((item) => item?.trim?.());
      if (\u8BA2\u9605\u94FE\u63A5\u6570\u7EC4.length > 0) {
        const \u8BF7\u6C42\u8BA2\u9605\u54CD\u5E94\u5185\u5BB9 = await getSUB(\u8BA2\u9605\u94FE\u63A5\u6570\u7EC4, request, \u8FFD\u52A0UA, userAgentHeader);
        console.log(\u8BF7\u6C42\u8BA2\u9605\u54CD\u5E94\u5185\u5BB9);
        req_data += \u8BF7\u6C42\u8BA2\u9605\u54CD\u5E94\u5185\u5BB9[0].join("\n");
        \u8BA2\u9605\u8F6C\u6362URL += "|" + \u8BF7\u6C42\u8BA2\u9605\u54CD\u5E94\u5185\u5BB9[1];
        if (\u8BA2\u9605\u683C\u5F0F == "base64" && !isSubConverterRequest && \u8BF7\u6C42\u8BA2\u9605\u54CD\u5E94\u5185\u5BB9[1].includes("://")) {
          subConverterUrl = `${subProtocol}://${subConverter}/sub?target=mixed&url=${encodeURIComponent(\u8BF7\u6C42\u8BA2\u9605\u54CD\u5E94\u5185\u5BB9[1])}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
          try {
            const subConverterResponse = await fetch(subConverterUrl, { headers: { "User-Agent": "v2rayN/CF-Workers-SUB  (https://github.com/cmliu/CF-Workers-SUB)" } });
            if (subConverterResponse.ok) {
              const subConverterContent = await subConverterResponse.text();
              req_data += "\n" + atob(subConverterContent);
            }
          } catch (error) {
            console.log("\u8BA2\u9605\u8F6C\u6362\u8BF7\u56DEbase64\u5931\u8D25\uFF0C\u68C0\u67E5\u8BA2\u9605\u8F6C\u6362\u540E\u7AEF\u662F\u5426\u6B63\u5E38\u8FD0\u884C");
          }
        }
      }
      if (env.WARP) \u8BA2\u9605\u8F6C\u6362URL += "|" + (await ADD(env.WARP)).join("|");
      const utf8Encoder = new TextEncoder();
      const encodedData = utf8Encoder.encode(req_data);
      const utf8Decoder = new TextDecoder();
      const text = utf8Decoder.decode(encodedData);
      const uniqueLines = new Set(text.split("\n"));
      const result = [...uniqueLines].join("\n");
      let base64Data;
      try {
        base64Data = btoa(result);
      } catch (e) {
        let encodeBase64 = function(data) {
          const binary = new TextEncoder().encode(data);
          let base64 = "";
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          for (let i = 0; i < binary.length; i += 3) {
            const byte1 = binary[i];
            const byte2 = binary[i + 1] || 0;
            const byte3 = binary[i + 2] || 0;
            base64 += chars[byte1 >> 2];
            base64 += chars[(byte1 & 3) << 4 | byte2 >> 4];
            base64 += chars[(byte2 & 15) << 2 | byte3 >> 6];
            base64 += chars[byte3 & 63];
          }
          const padding = 3 - (binary.length % 3 || 3);
          return base64.slice(0, base64.length - padding) + "==".slice(0, padding);
        };
        __name(encodeBase64, "encodeBase64");
        base64Data = encodeBase64(result);
      }
      const responseHeaders = {
        "content-type": "text/plain; charset=utf-8",
        "Profile-Update-Interval": `${SUBUpdateTime}`,
        "Profile-web-page-url": request.url.includes("?") ? request.url.split("?")[0] : request.url
        //"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
      };
      if (\u8BA2\u9605\u683C\u5F0F == "base64" || token == fakeToken) {
        return new Response(base64Data, { headers: responseHeaders });
      } else if (\u8BA2\u9605\u683C\u5F0F == "clash") {
        subConverterUrl = `${subProtocol}://${subConverter}/sub?target=clash&url=${encodeURIComponent(\u8BA2\u9605\u8F6C\u6362URL)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
      } else if (\u8BA2\u9605\u683C\u5F0F == "singbox") {
        subConverterUrl = `${subProtocol}://${subConverter}/sub?target=singbox&url=${encodeURIComponent(\u8BA2\u9605\u8F6C\u6362URL)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
      } else if (\u8BA2\u9605\u683C\u5F0F == "surge") {
        subConverterUrl = `${subProtocol}://${subConverter}/sub?target=surge&ver=4&url=${encodeURIComponent(\u8BA2\u9605\u8F6C\u6362URL)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
      } else if (\u8BA2\u9605\u683C\u5F0F == "quanx") {
        subConverterUrl = `${subProtocol}://${subConverter}/sub?target=quanx&url=${encodeURIComponent(\u8BA2\u9605\u8F6C\u6362URL)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&udp=true`;
      } else if (\u8BA2\u9605\u683C\u5F0F == "loon") {
        subConverterUrl = `${subProtocol}://${subConverter}/sub?target=loon&url=${encodeURIComponent(\u8BA2\u9605\u8F6C\u6362URL)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false`;
      }
      try {
        const subConverterResponse = await fetch(subConverterUrl, { headers: { "User-Agent": userAgentHeader } });
        if (!subConverterResponse.ok) return new Response(base64Data, { headers: responseHeaders });
        let subConverterContent = await subConverterResponse.text();
        if (\u8BA2\u9605\u683C\u5F0F == "clash") subConverterContent = await clashFix(subConverterContent);
        if (!userAgent.includes("mozilla")) responseHeaders["Content-Disposition"] = `attachment; filename*=utf-8''${encodeURIComponent(FileName)}`;
        return new Response(subConverterContent, { headers: responseHeaders });
      } catch (error) {
        return new Response(base64Data, { headers: responseHeaders });
      }
    }
  }
};
async function ADD(envadd) {
  var addtext = envadd.replace(/[	"'|\r\n]+/g, "\n").replace(/\n+/g, "\n");
  if (addtext.charAt(0) == "\n") addtext = addtext.slice(1);
  if (addtext.charAt(addtext.length - 1) == "\n") addtext = addtext.slice(0, addtext.length - 1);
  const add = addtext.split("\n");
  return add;
}
__name(ADD, "ADD");
async function nginx() {
  const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`;
  return text;
}
__name(nginx, "nginx");
async function sendMessage(type, ip, add_data = "") {
  if (BotToken !== "" && ChatID !== "") {
    let msg = "";
    const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
    if (response.status == 200) {
      const ipInfo = await response.json();
      msg = `${type}
IP: ${ip}
\u56FD\u5BB6: ${ipInfo.country}
<tg-spoiler>\u57CE\u5E02: ${ipInfo.city}
\u7EC4\u7EC7: ${ipInfo.org}
ASN: ${ipInfo.as}
${add_data}`;
    } else {
      msg = `${type}
IP: ${ip}
<tg-spoiler>${add_data}`;
    }
    let url = "https://api.telegram.org/bot" + BotToken + "/sendMessage?chat_id=" + ChatID + "&parse_mode=HTML&text=" + encodeURIComponent(msg);
    return fetch(url, {
      method: "get",
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": "Mozilla/5.0 Chrome/90.0.4430.72"
      }
    });
  }
}
__name(sendMessage, "sendMessage");
function base64Decode(str) {
  const bytes = new Uint8Array(atob(str).split("").map((c) => c.charCodeAt(0)));
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
}
__name(base64Decode, "base64Decode");
async function MD5MD5(text) {
  const encoder = new TextEncoder();
  const firstPass = await crypto.subtle.digest("MD5", encoder.encode(text));
  const firstPassArray = Array.from(new Uint8Array(firstPass));
  const firstHex = firstPassArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  const secondPass = await crypto.subtle.digest("MD5", encoder.encode(firstHex.slice(7, 27)));
  const secondPassArray = Array.from(new Uint8Array(secondPass));
  const secondHex = secondPassArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return secondHex.toLowerCase();
}
__name(MD5MD5, "MD5MD5");
function clashFix(content) {
  if (content.includes("wireguard") && !content.includes("remote-dns-resolve")) {
    let lines;
    if (content.includes("\r\n")) {
      lines = content.split("\r\n");
    } else {
      lines = content.split("\n");
    }
    let result = "";
    for (let line of lines) {
      if (line.includes("type: wireguard")) {
        const \u5907\u6539\u5185\u5BB9 = `, mtu: 1280, udp: true`;
        const \u6B63\u786E\u5185\u5BB9 = `, mtu: 1280, remote-dns-resolve: true, udp: true`;
        result += line.replace(new RegExp(\u5907\u6539\u5185\u5BB9, "g"), \u6B63\u786E\u5185\u5BB9) + "\n";
      } else {
        result += line + "\n";
      }
    }
    content = result;
  }
  return content;
}
__name(clashFix, "clashFix");
async function proxyURL(proxyURL2, url) {
  const URLs = await ADD(proxyURL2);
  const fullURL = URLs[Math.floor(Math.random() * URLs.length)];
  let parsedURL = new URL(fullURL);
  console.log(parsedURL);
  let URLProtocol = parsedURL.protocol.slice(0, -1) || "https";
  let URLHostname = parsedURL.hostname;
  let URLPathname = parsedURL.pathname;
  let URLSearch = parsedURL.search;
  if (URLPathname.charAt(URLPathname.length - 1) == "/") {
    URLPathname = URLPathname.slice(0, -1);
  }
  URLPathname += url.pathname;
  let newURL = `${URLProtocol}://${URLHostname}${URLPathname}${URLSearch}`;
  let response = await fetch(newURL);
  let newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
  newResponse.headers.set("X-New-URL", newURL);
  return newResponse;
}
__name(proxyURL, "proxyURL");
async function getSUB(api, request, \u8FFD\u52A0UA, userAgentHeader) {
  if (!api || api.length === 0) {
    return [];
  } else api = [...new Set(api)];
  let newapi = "";
  let \u8BA2\u9605\u8F6C\u6362URLs = "";
  let \u5F02\u5E38\u8BA2\u9605 = "";
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);
  try {
    const responses = await Promise.allSettled(api.map((apiUrl) => getUrl(request, apiUrl, \u8FFD\u52A0UA, userAgentHeader, controller.signal).then((response) => response.ok ? response.text() : Promise.reject(response))));
    const modifiedResponses = responses.map((response, index) => {
      if (response.status === "rejected") {
        const reason = response.reason;
        if (reason && reason.name === "AbortError") {
          return {
            status: "\u8D85\u65F6",
            value: null,
            apiUrl: api[index]
            // 将原始的apiUrl添加到返回对象中
          };
        }
        console.error(`\u8BF7\u6C42\u5931\u8D25: ${api[index]}, \u9519\u8BEF\u4FE1\u606F: ${reason.status} ${reason.statusText}`);
        return {
          status: "\u8BF7\u6C42\u5931\u8D25",
          value: null,
          apiUrl: api[index]
          // 将原始的apiUrl添加到返回对象中
        };
      }
      return {
        status: response.status,
        value: response.value,
        apiUrl: api[index]
        // 将原始的apiUrl添加到返回对象中
      };
    });
    console.log(modifiedResponses);
    for (const response of modifiedResponses) {
      if (response.status === "fulfilled") {
        const content = await response.value || "null";
        console.log(`[DEBUG] Fetched ${response.apiUrl}: Length=${content.length}`);
        if (content.includes("proxies:")) {
          \u8BA2\u9605\u8F6C\u6362URLs += "|" + response.apiUrl;
        } else if (content.includes('outbounds"') && content.includes('inbounds"')) {
          \u8BA2\u9605\u8F6C\u6362URLs += "|" + response.apiUrl;
        } else if (content.includes("://")) {
          newapi += content + "\n";
        } else if (isValidBase64(content)) {
          newapi += base64Decode(content) + "\n";
        } else {
          const \u5F02\u5E38\u8BA2\u9605LINK = `trojan://CMLiussss@127.0.0.1:8888?security=tls&allowInsecure=1&type=tcp&headerType=none#%E5%BC%82%E5%B8%B8%E8%AE%A2%E9%98%85%20${response.apiUrl.split("://")[1].split("/")[0]}`;
          console.log("\u5F02\u5E38\u8BA2\u9605: " + \u5F02\u5E38\u8BA2\u9605LINK);
          \u5F02\u5E38\u8BA2\u9605 += `${\u5F02\u5E38\u8BA2\u9605LINK}
`;
        }
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    clearTimeout(timeout);
  }
  const \u8BA2\u9605\u5185\u5BB9 = await ADD(newapi + \u5F02\u5E38\u8BA2\u9605);
  return [\u8BA2\u9605\u5185\u5BB9, \u8BA2\u9605\u8F6C\u6362URLs];
}
__name(getSUB, "getSUB");
async function getUrl(request, targetUrl, \u8FFD\u52A0UA, userAgentHeader, signal) {
  const newHeaders = new Headers(request.headers);
  newHeaders.set("User-Agent", `${atob("djJyYXlOLzYuNDU=")} cmliu/CF-Workers-SUB ${\u8FFD\u52A0UA}(${userAgentHeader})`);
  const modifiedRequest = new Request(targetUrl, {
    method: request.method,
    headers: newHeaders,
    body: request.method === "GET" ? null : request.body,
    redirect: "follow",
    signal: signal,
    cf: {
      // 忽略SSL证书验证
      insecureSkipVerify: true,
      // 允许自签名证书
      allowUntrusted: true,
      // 禁用证书验证
      validateCertificate: false
    }
  });
  console.log(`\u8BF7\u6C42URL: ${targetUrl}`);
  console.log(`\u8BF7\u6C42\u5934: ${JSON.stringify([...newHeaders])}`);
  console.log(`\u8BF7\u6C42\u65B9\u6CD5: ${request.method}`);
  console.log(`\u8BF7\u6C42\u4F53: ${request.method === "GET" ? null : request.body}`);
  return fetch(modifiedRequest);
}
__name(getUrl, "getUrl");
function isValidBase64(str) {
  const cleanStr = str.replace(/\s/g, "");
  const base64Regex = /^[A-Za-z0-9+/=\-_]+$/;
  return base64Regex.test(cleanStr);
}
__name(isValidBase64, "isValidBase64");
async function \u8FC1\u79FB\u5730\u5740\u5217\u8868(env, oldKey, newKey) {
  const oldData = await env.KV.get(oldKey);
  const newData = await env.KV.get(newKey);
  if (oldData && !newData) {
    await env.KV.put(newKey, oldData);
    await env.KV.delete(oldKey);
    return true;
  }
  return false;
}
__name(\u8FC1\u79FB\u5730\u5740\u5217\u8868, "\u8FC1\u79FB\u5730\u5740\u5217\u8868");
async function KV(request, env, txt, guest) {
  const url = new URL(request.url);
  const mytoken = env.TOKEN || "auto"; // 【新增】获取 mytoken
  const subKey = txt.split('.')[1] || 'main'; // 【新增】获取当前配置名
  try {
    if (request.method === "POST") {
      if (!env.KV) return new Response("\u672A\u7ED1\u5B9AKV\u7A7A\u95F4", { status: 400 });
      try {
        const content2 = await request.text();
        await env.KV.put(txt, content2);
        return new Response("\u4FDD\u5B58\u6210\u529F");
      } catch (error) {
        console.error("\u4FDD\u5B58KV\u65F6\u53D1\u751F\u9519\u8BEF:", error);
        return new Response("\u4FDD\u5B58\u5931\u8D25: " + error.message, { status: 500 });
      }
    }
    let content = "";
    let hasKV = !!env.KV;
    if (hasKV) {
      try {
        content = await env.KV.get(txt) || "";
      } catch (error) {
        console.error("\u8BFB\u53D6KV\u65F6\u53D1\u751F\u9519\u8BEF:", error);
        content = "\u8BFB\u53D6\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: " + error.message;
      }
    }
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${FileName} \u8BA2\u9605\u7F16\u8F91</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
						body {
							margin: 0;
							padding: 15px; /* \u8C03\u6574padding */
							box-sizing: border-box;
							font-size: 13px; /* \u8BBE\u7F6E\u5168\u5C40\u5B57\u4F53\u5927\u5C0F */
						}
						.editor-container {
							width: 100%;
							max-width: 100%;
							margin: 0 auto;
						}
						.editor {
							width: 100%;
							height: 300px; /* \u8C03\u6574\u9AD8\u5EA6 */
							margin: 15px 0; /* \u8C03\u6574margin */
							padding: 10px; /* \u8C03\u6574padding */
							box-sizing: border-box;
							border: 1px solid #ccc;
							border-radius: 4px;
							font-size: 13px;
							line-height: 1.5;
							overflow-y: auto;
							resize: none;
						}
						.save-container {
							margin-top: 8px; /* \u8C03\u6574margin */
							display: flex;
							align-items: center;
							gap: 10px; /* \u8C03\u6574gap */
						}
						.save-btn, .back-btn {
							padding: 6px 15px; /* \u8C03\u6574padding */
							color: white;
							border: none;
							border-radius: 4px;
							cursor: pointer;
						}
						.save-btn {
							background: #4CAF50;
						}
						.save-btn:hover {
							background: #45a049;
						}
						.back-btn {
							background: #666;
						}
						.back-btn:hover {
							background: #555;
						}
						.save-status {
							color: #666;
						}
          </style>
          <script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"><\/script>
        </head>
        <body>
          ################################################################<br>
          Subscribe / sub \u8BA2\u9605\u5730\u5740, \u70B9\u51FB\u94FE\u63A5\u81EA\u52A8 <strong>\u590D\u5236\u8BA2\u9605\u94FE\u63A5</strong> \u5E76 <strong>\u751F\u6210\u8BA2\u9605\u4E8C\u7EF4\u7801</strong> <br>
          
          <!-- 【新增：当前配置名称显示】 -->
          ---------------------------------------------------------------<br>
          \u5F53\u524D\u914D\u7F6E\u540D\u79F0: 
          <input type="text" id="configNameInput" value="${subKey}" style="border: 1px solid #ccc; padding: 5px; width: 150px; display: inline-block;">
          <button class="back-btn" onclick="goToConfig()" style="display: inline-block; padding: 6px 15px; margin-left: 10px; background: #6a11cb; color: white;">\u8FDB\u5165\u914D\u7F6E</button>
          <br>
          ---------------------------------------------------------------<br>

          \u81EA\u9002\u5E94\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?sub','qrcode_0')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}</a><br>
          <div id="qrcode_0" style="margin: 10px 10px 10px 10px;"></div>
          Base64\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?b64','qrcode_1')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?b64</a><br>
          <div id="qrcode_1" style="margin: 10px 10px 10px 10px;"></div>
          clash\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?clash','qrcode_2')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?clash</a><br>
          <div id="qrcode_2" style="margin: 10px 10px 10px 10px;"></div>
          singbox\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?sb','qrcode_3')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?sb</a><br>
          <div id="qrcode_3" style="margin: 10px 10px 10px 10px;"></div>
          surge\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?surge','qrcode_4')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?surge</a><br>
          <div id="qrcode_4" style="margin: 10px 10px 10px 10px;"></div>
          loon\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?loon','qrcode_5')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?loon</a><br>
          <div id="qrcode_5" style="margin: 10px 10px 10px 10px;"></div>
          &nbsp;&nbsp;<strong><a href="javascript:void(0);" id="noticeToggle" onclick="toggleNotice()">\u67E5\u770B\u8BBF\u5BA2\u8BA2\u9605\u2228</a></strong><br>
          <div id="noticeContent" class="notice-content" style="display: none;">
            ---------------------------------------------------------------<br>
            \u8BBF\u5BA2\u8BA2\u9605\u53EA\u80FD\u4F7F\u7528\u8BA2\u9605\u529F\u80FD\uFF0C\u65E0\u6CD5\u67E5\u770B\u914D\u7F6E\u9875\uFF01<br>
            GUEST\uFF08\u8BBF\u5BA2\u8BA2\u9605TOKEN\uFF09: <strong>${guest}</strong><br>
            ---------------------------------------------------------------<br>
            \u81EA\u9002\u5E94\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}','guest_0')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}</a><br>
            <div id="guest_0" style="margin: 10px 10px 10px 10px;"></div>
            Base64\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&b64','guest_1')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&b64</a><br>
            <div id="guest_1" style="margin: 10px 10px 10px 10px;"></div>
            clash\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&clash','guest_2')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&clash</a><br>
            <div id="guest_2" style="margin: 10px 10px 10px 10px;"></div>
            singbox\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&sb','guest_3')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&sb</a><br>
            <div id="guest_3" style="margin: 10px 10px 10px 10px;"></div>
            surge\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&surge','guest_4')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&surge</a><br>
            <div id="guest_4" style="margin: 10px 10px 10px 10px;"></div>
            loon\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&loon','guest_5')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&loon</a><br>
            <div id="guest_5" style="margin: 10px 10px 10px 10px;"></div>
          </div>
          ---------------------------------------------------------------<br>
          ################################################################<br>
          \u8BA2\u9605\u8F6C\u6362\u914D\u7F6E<br>
          ---------------------------------------------------------------<br>
          SUBAPI\uFF08\u8BA2\u9605\u8F6C\u6362\u540E\u7AEF\uFF09: <strong>${subProtocol}://${subConverter}</strong><br>
          SUBCONFIG\uFF08\u8BA2\u9605\u8F6C\u6362\u914D\u7F6E\u6587\u4EF6\uFF09: <strong>${subConfig}</strong><br>
          ---------------------------------------------------------------<br>
          ################################################################<br>
          CF-Workers-SUB \u6C47\u805A\u8BA2\u9605\u7F16\u8F91: 
          <div class="editor-container">
            ${hasKV ? `
            <textarea class="editor" 
              placeholder="LINK示例（一行一个订阅链接/节点链接）：\nvless://246aa795-0637-4f4c-8f64-2c8fb24c1bad@127.0.0.1:1234?encryption=none&security=tls&sni=TG.CMLiussss.loseyourip.com&allowInsecure=1&type=ws&host=TG.CMLiussss.loseyourip.com&path=%2F%3Fed%3D2560%23CFnat\ntrojan://aa6ddd2f-d1cf-4a52-ba1b-2640c41a7856@218.190.230.207:41288?security=tls&sni=hk12.bilibili.com&allowInsecure=1&type=tcp&headerType=none#HK\nss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNToyRXRQcW42SFlqVE5jSG9oTGZVcEZRd25makNDUTVtaDFtSmRFTUNCdWN1V1o5UDF1ZGtSS0huVnh1bzU1azFLWHoyRm82anJndDE4VzY2b3B0eTFlNGJtMWp6ZkNmQmI%3D@84.19.31.63:50841#DE\n\n\n（订阅链接示例）：\nhttps://sub.xf.free.hr/auto"
              id="content">${content}</textarea>
            <div class="save-container">
              <button class="save-btn" onclick="saveContent(this)">\u4FDD\u5B58</button>
              <span class="save-status" id="saveStatus"></span>
            </div>
            ` : "<p>\u8BF7\u7ED1\u5B9A <strong>\u53D8\u91CF\u540D\u79F0</strong> \u4E3A <strong>KV</strong> \u7684KV\u547D\u540D\u7A7A\u95F4</p>"}
          </div>
          <br>
          ################################################################<br>
          telegram 交流群 技术大佬~在线吹发！<br>
          <a href='https://t.me/CMLiussss'>https://t.me/CMLiussss</a><br>
          ---------------------------------------------------------------<br>
          github 项目地址 Star!Star!Star!!!<br>
          <a href='https://github.com/cmliu/CF-Workers-SUB'>https://github.com/cmliu/CF-Workers-SUB</a><br>
          <br><br>UA: <strong>${request.headers.get("User-Agent")}</strong>
          <script>
          const mytoken = '${mytoken}';
          function goToConfig() {
              const configName = document.getElementById('configNameInput').value;
              const currentPath = window.location.pathname; // /main/wh898
              const newToken = currentPath.split('/').pop(); // wh898
              
              // 构建新的 URL：https://hostname/HF/wh898
              const newUrl = \`https://${url.hostname}/\${configName}/\${newToken}\`;
              
              // 如果配置名改变，则重定向到新的链接
              if (configName !== '${subKey}') {
                  window.location.href = newUrl;
              } else {
                  alert('\u914D\u7F6E\u540D\u79F0\u672A\u6539\u53D8\uFF0C\u65E0\u9700\u8FDB\u5165');
              }
          }
          
          function copyToClipboard(text, qrcode) {
            navigator.clipboard.writeText(text).then(() => {
              alert('\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F');
            }).catch(err => {
              console.error('\u590D\u5236\u5931\u8D25:', err);
            });
            const qrcodeDiv = document.getElementById(qrcode);
            qrcodeDiv.innerHTML = '';
            new QRCode(qrcodeDiv, {
              text: text,
              width: 220, // \u8C03\u6574\u5BBD\u5EA6
              height: 220, // \u8C03\u6574\u9AD8\u5EA6
              colorDark: "#000000", // \u4E8C\u7EF4\u7801\u989C\u8272
              colorLight: "#ffffff", // \u80CC\u666F\u989C\u8272
              correctLevel: QRCode.CorrectLevel.Q, // \u8BBE\u7F6E\u7EA0\u9519\u7EA7\u522B
              scale: 1 // \u8C03\u6574\u50CF\u7D20\u9897\u7C92\u5EA6
            });
          }
						
					if (document.querySelector('.editor')) {
						let timer;
						const textarea = document.getElementById('content');
						const originalContent = textarea.value;
		
						function goBack() {
							const currentUrl = window.location.href;
							const parentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
							window.location.href = parentUrl;
						}
		
						function replaceFullwidthColon() {
							const text = textarea.value;
							textarea.value = text.replace(/\uFF1A/g, ':');
						}
						
						function saveContent(button) {
							try {
								const updateButtonText = (step) => {
									button.textContent = \`\u4FDD\u5B58\u4E2D: \${step}\`;
								};
								// \u68C0\u6D4B\u662F\u5426\u4E3AiOS\u8BBE\u5907
								const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
								
								// \u4EC5\u5728\u975EiOS\u8BBE\u5907\u4E0A\u6267\u884CreplaceFullwidthColon
								if (!isIOS) {
									replaceFullwidthColon();
								}
								updateButtonText('\u5F00\u59CB\u4FDD\u5B58');
								button.disabled = true;

								// \u83B7\u53D6textarea\u5185\u5BB9\u548C\u539F\u59CB\u5185\u5BB9
								const textarea = document.getElementById('content');
								if (!textarea) {
									throw new Error('\u627E\u4E0D\u5230\u6587\u672C\u7F16\u8F91\u533A\u57DF');
								}

								updateButtonText('\u83B7\u53D6\u5185\u5BB9');
								let newContent;
								let originalContent;
								try {
									newContent = textarea.value || '';
									originalContent = textarea.defaultValue || '';
								} catch (e) {
									console.error('\u83B7\u53D6\u5185\u5BB9\u9519\u8BEF:', e);
									throw new Error('\u65E0\u6CD5\u83B7\u53D6\u7F16\u8F91\u5185\u5BB9');
								}

								updateButtonText('\u51C6\u5907\u72B6\u6001\u66F4\u65B0\u51FD\u6570');
								const updateStatus = (message, isError = false) => {
									const statusElem = document.getElementById('saveStatus');
									if (statusElem) {
										statusElem.textContent = message;
										statusElem.style.color = isError ? 'red' : '#666';
									}
								};

								updateButtonText('\u51C6\u5907\u6309\u94AE\u91CD\u7F6E\u51FD\u6570');
								const resetButton = () => {
									button.textContent = '\u4FDD\u5B58';
									button.disabled = false;
								};

                if (newContent !== originalContent) {
                  updateButtonText('\u53D1\u9001\u4FDD\u5B58\u8BF7\u6C42');
                  button.disabled = true;

                  // 【新增】获取新的配置名称
                  const newConfigName = document.getElementById('configNameInput').value;
                  // 【新增】构建新的保存 URL：/配置名/Token
                  const newSaveUrl = \`https://${url.hostname}/\${newConfigName || 'main'}/\${mytoken}\`;
                  
                  fetch(newSaveUrl, { // <--- 【修改】使用新的 newSaveUrl
                    method: 'POST',
                    body: newContent,
                    headers: {
                      'Content-Type': 'text/plain;charset=UTF-8'
                    },
                    cache: 'no-cache'
                  })
                  .then(response => {
										updateButtonText('\u68C0\u67E5\u54CD\u5E94\u72B6\u6001');
										if (!response.ok) {
											throw new Error(\`HTTP error! status: \${response.status}\`);
										}
										updateButtonText('\u66F4\u65B0\u4FDD\u5B58\u72B6\u6001');
										const now = new Date().toLocaleString();
										document.title = \`\u7F16\u8F91\u5DF2\u4FDD\u5B58 \${now}\`;
										updateStatus(\`\u5DF2\u4FDD\u5B58 \${now}\`);
									})
									.catch(error => {
										updateButtonText('\u5904\u7406\u9519\u8BEF');
										console.error('Save error:', error);
										updateStatus(\`\u4FDD\u5B58\u5931\u8D25: \${error.message}\`, true);
									})
									.finally(() => {
										resetButton();
									});
								} else {
									updateButtonText('\u68C0\u67E5\u5185\u5BB9\u53D8\u5316');
									updateStatus('\u5185\u5BB9\u672A\u53D8\u5316');
									resetButton();
								}
							} catch (error) {
								console.error('\u4FDD\u5B58\u8FC7\u7A0B\u51FA\u9519:', error);
								button.textContent = '\u4FDD\u5B58';
								button.disabled = false;
								const statusElem = document.getElementById('saveStatus');
								if (statusElem) {
									statusElem.textContent = \`\u9519\u8BEF: \${error.message}\`;
									statusElem.style.color = 'red';
								}
							}
						}
		
						textarea.addEventListener('blur', saveContent);
						textarea.addEventListener('input', () => {
							clearTimeout(timer);
							timer = setTimeout(saveContent, 5000);
						});
					}

					function toggleNotice() {
						const noticeContent = document.getElementById('noticeContent');
						const noticeToggle = document.getElementById('noticeToggle');
						if (noticeContent.style.display === 'none' || noticeContent.style.display === '') {
							noticeContent.style.display = 'block';
							noticeToggle.textContent = '\u9690\u85CF\u8BBF\u5BA2\u8BA2\u9605\u2227';
						} else {
							noticeContent.style.display = 'none';
							noticeToggle.textContent = '\u67E5\u770B\u8BBF\u5BA2\u8BA2\u9605\u2228';
						}
					}
			
					// \u521D\u59CB\u5316 noticeContent \u7684 display \u5C5E\u6027
					document.addEventListener('DOMContentLoaded', () => {
						document.getElementById('noticeContent').style.display = 'none';
					});
					<\/script>
				</body>
			</html>
		`;
    return new Response(html, {
      headers: { "Content-Type": "text/html;charset=utf-8" }
    });
  } catch (error) {
    console.error("\u5904\u7406\u8BF7\u6C42\u65F6\u53D1\u751F\u9519\u8BEF:", error);
    return new Response("\u670D\u52A1\u5668\u9519\u8BEF: " + error.message, {
      status: 500,
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });
  }
}
__name(KV, "KV");
export {
  worker_default as default
};
//# sourceMappingURL=_worker.js.map
