
#!/bin/bash
tarName=dist.tar.gz
testServerDir=/crm/busi-tomcat/webapps/terminal
# 郎酒测试服务器
targetServer=192.168.100.58
# git pull
npm run build
tar -czf $tarName dist
scp -P 22 $tarName root@${targetServer}:${testServerDir} 
rm -rf ${tarName}
ssh -p 22 root@${targetServer} > /dev/null 2>&1 << eeooff
# ssh -p 22 root@${targetServer} 2>&1 << EOF
cd /crm/busi-tomcat/webapps/terminal
ls | grep -v dist.tar.gz | xargs rm -rf
tar -xzf dist.tar.gz
cp -rf ./dist/* .
rm -rf ./dist
rm -rf dist.tar.gz
EOF
echo "前端代码部署测试完毕"





