echo Installing repos
#
cd ~
sudo apt-get install zip unzip -y
sudo apt-get install python3-tk -y
sudo pip3 install wikipedia periodictable Pillow pygame mutagen virtualenv mysql.connector mysql-connector-python bcrypt
sudo apt-get install python3-mutagen -y
sudo python3 -m pip install --upgrade pip
sudo python3 -m pip install --upgrade Pillow
#
echo Downloading files
sudo mkdir .astudypal
cd .astudypal
sudo wget https://wized.club/ASPInstaller/AStudyPal.zip
sudo unzip AStudyPal.zip
sudo cp linux/wized-lin.sh ~
sudo cp linux/launcher.desktop ~
alias astudypal="sh /home/$USER/.astudypal/linux/wized-lin.sh"
cd ~
#
echo running app
#
sudo chmod +x wized-lin.sh
sh wized-lin.sh
