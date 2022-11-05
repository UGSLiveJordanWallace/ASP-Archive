from tkinter import *
########################
from studentrec import *
########################
import socket
import select
import errno
import sys
########################

def os_detection(windows, linux, mac):
    if os.name == 'nt':
        return windows

    elif os.name == 'posix' and 'Linux' in platform.system():
        return linux

    else:
        return mac

def free_books():
    var = e_fbk.get()

    textbook_pdf = Books(NONE, NONE, var).free_books()

    print(textbook_pdf)

def books():
    var = e_book.get()
    var2 = e_book2.get()

    var_book = Books(var, var2, NONE)
    var_book.textbook_answers()

def dd1():
    screen.destroy()

def studentrecstartup():
    global screen
    global money
    global finance_label
    global finance_money

    screen = Tk()
    screen.title('Student Resouces and Development Department')
    screen.geometry('600x600')

    imgos = os_detection("C:/ProgramData/Wized/venv/Images/student_resourcesico.ico", "@/usr/lib/wized/venv/Images/favicon3-jpg.xbm", NONE)
    screen.iconbitmap(imgos)

    window_os = os_detection('zoomed', 'normal', 'normal')
    screen.state(f"{window_os}")
    screen.config(bg = 'blue')

    screen.rowconfigure(0, weight = 1)
    screen.columnconfigure(0, weight = 1)

    frame = Frame(screen, bg = "black")
    frame.pack(side = TOP, fill = 'x')

    Label(frame, text = "Student Resources", font = ("Palatino", 28), bg = 'white').pack(pady = 4)

    frame2 = Frame(screen, bg = 'blue')
    frame2.pack()

    ####################################################################################################################
    in_frame = Frame(frame2, bg = 'light grey')
    in_frame.grid(row = 0, column = 0, sticky = 'n')

    ####################################################################################################################
    in_frame2 = Frame(frame2, bg = 'cyan')
    in_frame2.grid(row = 0, column = 1, sticky = 'n')

    Label(in_frame2, text = 'Books & Answer Keys', font = ('lato', 35), bg = 'cyan').pack(padx = 30)

    Label(in_frame2, text = 'Textbook ISBN number', font = ('lato', 10), bg = 'cyan').pack(pady = 8)

    global book
    global booking

    book = StringVar()
    booking = StringVar()

    global e_book
    global e_book2

    e_book = Entry(in_frame2, textvariable = book, width = 14, font = ('Times', 20), borderwidth = 2)
    e_book.pack(pady = 12)

    Label(in_frame2, text = 'Textbook page number', font = ('lato', 10), bg = 'cyan').pack(pady = 8)

    e_book2 = Entry(in_frame2, textvariable = booking, width = 14, font = ('Times', 20), borderwidth = 2)
    e_book2.pack(pady = 12)

    find_btn1 = Button(in_frame2, text = 'Find', width = 8, height = 1, font = ('Palatino', 16), command = books)
    find_btn1.pack(pady = 8)
    ####################################################################################################################
    Label(in_frame2, text = '', font = ('lato', 10), bg = 'cyan').pack(pady = 6)                                       #
    ####################################################################################################################
    Label(in_frame2, text = 'Free PDF textbooks', font = ('Palatino', 25), bg = 'cyan').pack()

    global e_fbk

    e_fbk = Entry(in_frame2, borderwidth = 2, width = 13, font = ('Times', 20))
    e_fbk.pack()

    find_btn2 = Button(in_frame2, text = 'Find', font = ('Palatino', 16), width = 8, height = 1, command = free_books)
    find_btn2.pack(pady = 10)
    ####################################################################################################################
    # in_frame3 = Frame(frame2, bg = 'red')
    # in_frame3.grid(row = 0, column = 2, sticky = 'n')

    # Label(in_frame3, text = 'Feedback', font = ('lato', 35), bg = 'red').pack(padx = 30)

    # global e_feed
    # global e_feed2

    # Label(in_frame3, text = 'Username', font = ('lato', 15), bg = 'red').pack(padx = 8)

    # e_feed = Entry(in_frame3, width = 18, font = ('Times', 20), borderwidth = 2)
    # e_feed.pack(pady = 12)

    # Label(in_frame3, text = 'Feedback Center', font = ('lato', 15), bg = 'red').pack(padx = 8)

    # e_feed2 = Text(in_frame3, width = 18, height = 7,font = ('Times', 20), borderwidth = 2)
    # e_feed2.pack(pady = 12)

    # screen.bind("<Return>", saving)

    # save = Button(in_frame3, width = 12, height = 1, text = 'Send Feedback', font = ('lato', 10), command = saving)
    # save.pack(pady = 20)
    ####################################################################################################################

    bck_btn6 = Button(screen, width = 14, height = 1, text = 'Table Of Contents', font = ('lato', 30), command = dd1)
    bck_btn6.pack(side = BOTTOM)

    screen.mainloop()
