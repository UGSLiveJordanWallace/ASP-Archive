@REM colorization
color 06
title AStudyPal Installer
cls

@REM Wized Installer [WINDOWS]
@REM Created By : Chris Taylor [C0SM0] & Jordan

@REM get admin permissions for installation
@echo off
:: BatchGotAdmin
:-------------------------------------
@REM  --> check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

@REM --> if error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params= %*
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params:"=""%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"

@REM confirm installation
echo *By selecting "y" or "Y" you are confirming that you will use this app with Academic Integrity in mind
echo Are you sure you want to install "AStudyPal" (Y/N)
set/p "cho=>"
if %cho%==Y goto DEPENDENCIES
if %cho%==y goto DEPENDENCIES
if %cho%==n goto END
if %cho%==N goto END
echo Invalid choice.
goto END

@REM creates directories and removes dependencies
:DEPENDENCIES
echo Removing Previous Dependencies...
del /s /q "C:\ProgramData\AStudyPal" 
for /d %%p in ("C:\ProgramData\AStudyPal\*.*") do rmdir "%%p" /s /q 
echo Previous AStudyPal Dependencies Removed
echo Generating Directories...
mkdir C:\ProgramData\AStudyPal
echo Directories Generated
goto INSTALLASP

rem echo Do you have python 3.9 installed? (Y/N)
rem set/p "cho=>"
rem if %cho%==Y goto CHECKPIP
rem if %cho%==y goto CHECKPIP
rem if %cho%==n goto GETPY
rem if %cho%==N goto GETPY
rem echo Invalid choice.
rem goto END

rem @REM gets python
rem :GETPY
rem echo Downloading Python...
rem start python3
rem echo Python Installed
rem echo Confirm Installation
rem goto CHECKPYTHON

rem @REM validates PIP
rem :CHECKPIP
rem echo Do you have python PIP installed? (Y/N)
rem set/p "cho=>"
rem if %cho%==Y goto INSTALLASP
rem if %cho%==y goto INSTALLASP
rem if %cho%==n goto GETPIP
rem if %cho%==N goto GETPIP
rem echo Invalid choice.
rem goto END

rem @REM gets PIP
rem :GETPIP
rem echo Unlocking Files...
rem attrib -h -s -r get-pip.py
rem echo Installing PIP...
rem powershell -c "Invoke-WebRequest -Uri 'https://wized.club/WizedInstaller/get-pip.py' -OutFile 'C:\ProgramData\Wized\get-pip.py'"

rem @REM installs PIP
rem py -3.9 C:\ProgramData\Wized\get-pip.py
rem echo PIP Installed 
rem goto INSTALLASP

@REM installs wized
:INSTALLASP
@REM Downloads wized files
echo Downloading AStudyPal Files...
powershell -c "Invoke-WebRequest -Uri 'https://wized.club/ASPInstaller/AStudyPal.zip' -OutFile 'C:\ProgramData\AStudyPal\AStudyPal.zip'"
echo Files Succesfully Downloaded

@REM Extracts Files
echo Extracting Files...
powershell -Command "Expand-Archive C:\ProgramData\AStudyPal\AStudyPal.zip -DestinationPath C:\ProgramData\AStudyPal"
echo Files Extracted

@REM moves files
copy C:\ProgramData\AStudyPal\venv\AStudyPal.exe C:\Users\%username%\Desktop 
copy C:\ProgramData\AStudyPal\venv\AStudyPal.exe C:\Users\%username%\Downloads
echo Executable copied from "C:\ProgramData\AStudyPal"

echo Running Files
goto RUN

rem @REM updates PIP
rem echo Updating PIP...
rem echo %username%
rem C:\Users\%username%\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.9_qbz5n2kfra8p0\python.exe -m pip install --upgrade pip
rem echo PIP Updated

rem @REM create virtual environment
rem echo Creating Virtual Environment...
rem python -m venv C:\ProgramData\Wized\venv
rem @REM installs python packages
rem echo Installing Python Packages... 
rem cd C:\ProgramData\Wized\venv\Scripts
rem start activate & pip3 install wikipedia & pip3 install periodictable & pip3 install Pillow & pip3 install pygame & pip3 install mutagen
rem echo Packages Installed! 

rem @REM deletes "get-pip.py" file
rem echo Deleting PIP Installer...
rem del get-pip.py
rem echo Installer Deleted
rem goto RUN

@REM runs wized
:RUN
@REM starts wized
powershell -c set-alias astudypal "C:\ProgramData\AStudyPal\venv\AStudyPal.exe"
doskey astudypal="C:\ProgramData\AStudyPal\venv\AStudyPal.exe"
echo starting "AStudyPal"...
"C:\ProgramData\AStudyPal\venv\AStudyPal.exe"
goto END

@REM exits installer
:END
echo Exiting... 
exit
