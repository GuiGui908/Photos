#/bin/sh

cd ftpFolder/tomcat
mv *.war ng.war
mv ng.war /var/lib/tomcat8/webapps
/etc/init.d/tomcat8 restart
tail -f /var/lib/tomcat8/logs/catalina.out



