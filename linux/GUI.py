# Main module [astudypal]
# Created by Chris Taylor [C0SM0] & Jordan Wallace
# Date 1/31/2020
# Version =>!@1
############################
from mathEdwiz import *
from foreignlanguages import *
from scienceEdwiz import *
from englishEdwiz import *
from historyWized import *
from studentrecGui import *
from database import DataBase
############################
from tkinter import *
from tkinter import ttk
from tkinter import filedialog
############################
import time
import webbrowser
import threading
import pickle
import os
import platform
import sys
############################
#PIP install
from PIL import ImageTk,Image
import contextlib
with contextlib.redirect_stdout(None):
    import pygame
from mutagen.mp3 import MP3
import mutagen.ogg as OGG
import mysql.connector
############################

pygame.mixer.pre_init(22050, -16, 2, 512)
pygame.init()

def teacherPass(teacher):
    show_Frame(successFrame)
    canvas = Canvas(successFrame, width = 900, height = 550, bd=0, highlightthickness=0)
    canvas.pack(fill = BOTH, expand = True)

    img = Image.open('C:/ProgramData/AStudyPal/venv/Images/loading screen image.jpg')
    img = ImageTk.PhotoImage(img)
    canvas.create_image(0,0, image = img, anchor = 'nw')
    canvas.create_text(450, 125, text = f'Welcome {teacher}', font = ('Courier New', 35), fill = 'palegoldenrod')
    canvas.create_text(450, 175, text = f'Please Wait...', font = ('Courier New', 44), fill = 'palegoldenrod')

    try:
        progressbar = Frame(canvas)
        canvas.create_window(450, 350, window = progressbar)
        loading_bar = ttk.Progressbar(progressbar, length = 400, mode = 'determinate', orient = HORIZONTAL, cursor = 'spider')
        loading_bar.pack()
        canvas.create_text(450, 420, text="Loading...",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="loading")

        for i in range(100):
            loading_bar['value'] += 1
            canvas.update()
            canvas.update_idletasks()
            time.sleep(0.10)
            if loading_bar['value'] == 20:
                canvas.delete("loading")
                canvas.create_text(450, 420, text="collecting class",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="collect")
                canvas.update()
                canvas.update_idletasks()
            if loading_bar['value'] == 50:
                canvas.delete("collect")
                canvas.create_text(450, 420, text=f"class received teacher",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="class")
                canvas.update()
                canvas.update_idletasks()
            if loading_bar['value'] == 80:
                canvas.delete("class")
                canvas.create_text(450, 420, text=f"Thank You",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="thanks")
            if loading_bar['value'] >= 100:
                canvas.delete("class")
                canvas.create_text(450, 420, text=f"Thank You",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="thanks")
                time.sleep(1)
                canvas.update()
                canvas.update_idletasks()
                screen.destroy()    
    except Exception as e:
        pass

def studentPass(student):
    show_Frame(successFrame)
    canvas = Canvas(successFrame, width = 900, height = 550, bd=0, highlightthickness=0)
    canvas.pack(fill = BOTH, expand = True)

    img = Image.open('C:/ProgramData/AStudyPal/venv/Images/loading screen image.jpg')
    img = ImageTk.PhotoImage(img)
    canvas.create_image(0,0, image = img, anchor = 'nw')
    canvas.create_text(450, 125, text = f'Welcome {student}', font = ('Courier New', 25), fill = 'palegoldenrod')
    canvas.create_text(450, 175, text = f'Please Wait...', font = ('Courier New', 44), fill = 'palegoldenrod')

    try:
        progressbar = Frame(canvas)
        canvas.create_window(450, 350, window = progressbar)
        loading_bar = ttk.Progressbar(progressbar, length = 400, mode = 'determinate', orient = HORIZONTAL, cursor = 'spider')
        loading_bar.pack()
        canvas.create_text(450, 420, text="Loading...",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="loading")

        for i in range(100):
            loading_bar['value'] += 1
            canvas.update()
            canvas.update_idletasks()
            time.sleep(0.10)
            if loading_bar['value'] == 20:
                canvas.delete("loading")
                canvas.create_text(450, 420, text="collecting class",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="collect")
                canvas.update()
                canvas.update_idletasks()
            if loading_bar['value'] == 50:
                canvas.delete("collect")
                canvas.create_text(450, 420, text=f"class received student",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="class")
                canvas.update()
                canvas.update_idletasks()
            if loading_bar['value'] == 80:
                canvas.delete("class")
                canvas.create_text(450, 420, text=f"Thank You",  font = ('Courier New', 20), fill = 'palegoldenrod', tag="thanks")
            if loading_bar['value'] >= 100:
                time.sleep(1)
                canvas.update()
                canvas.update_idletasks()
                screen.destroy()
    except Exception as e:
        pass

def login(email, password):
    try:
        db = DataBase()
        boolean_value = db.login(password, email)

        if boolean_value:
            c.execute(f"SELECT * FROM users WHERE email = '{email}'")
            user = []
            for row in c:
                user += row

            if "student" in user:
                studentPass(user[1])
            elif "teacher" in user:
                teacherPass(user[1])
            else:
               pass
        else:
            pass

    except Exception as e:
        print(e)
        sys.exit()

def show_Frame(frame):
    frame.tkraise()

def clear(event):
    if (email_entry.get() == 'Email:' or password_entry.get() == "Password:"):
        email_entry.delete(0, END)
        password_entry.delete(0, END)
        password_entry.config(show="*")
    else:
        return


def on_close():
    sys.exit()

def authentication_screen():    
    global email_entry
    global password_entry
    global mydb
    global c
    global canvas
    global screen
    global loginFrame
    global successFrame

    # Configuring the Database
    mydb = mysql.connector.connect(user='bc775ee66e30b7', password='fcb659ba', host='us-cdbr-east-03.cleardb.com', database='heroku_3e2d5234dae34bd', auth_plugin='mysql_native_password')
    c = mydb.cursor()

    # Setting up the Window
    screen = Tk()
    screen.title("AStudyPal")
    screen.geometry("700x600")

    screenIMG = os_detect('C:/ProgramData/AStudyPal/venv/Images/WizedLoading.ico', "@/usr/lib/astudypal/venv/Images/WizedLoading.xbm", NONE)
    screen.iconbitmap(screenIMG)
    app_width = 900
    app_height = 550
    screen_width = screen.winfo_screenwidth()
    screen_height = screen.winfo_screenheight()
    x = (screen_width / 2) - (app_width / 2)
    y = (screen_height / 2) - (app_height / 2)
    screen.geometry(f"{app_width}x{app_height}+{int(x)}+{int(y)}")

    # Row and Column Configure 
    screen.rowconfigure(0, weight = 1)
    screen.columnconfigure(0, weight = 1)

    email = StringVar()
    password = StringVar()

    loginFrame = Frame(screen)
    successFrame = Frame(screen)

    img = Image.open('C:/ProgramData/AStudyPal/venv/Images/loading screen image.jpg')
    img = ImageTk.PhotoImage(img)

    canvas = Canvas(loginFrame, width = 900, height = 550, bd=0, highlightthickness=0)
    canvas.pack(fill = BOTH, expand = True)
    canvas.create_image(0,0, image = img, anchor = 'nw')
    canvas.create_text(450, 125, text = 'Please Log In', font = ('Courier New', 70), fill = 'palegoldenrod')

    email_entry = Entry(loginFrame, textvariable=email, width=30, font=("Times", 30), bd=0)
    email_entry.bind("<Button-1>", clear)
    password_entry = Entry(loginFrame, textvariable=password, width=30, font=("Times", 30), bd=0)
    password_entry.bind("<Button-1>", clear)

    email_entry.insert(END, "Email:")
    password_entry.insert(END, "Password:")

    e_window = canvas.create_window(140, 220, anchor="nw", window=email_entry)
    p_window = canvas.create_window(140, 280, anchor="nw", window=password_entry)

    btn = Button(loginFrame, text="Connect", width=10, font=("palatino", 25), command=lambda : login(email.get(), password.get()))
    btn_window = canvas.create_window(350, 350, anchor='nw', window=btn)

    for frame in (successFrame, loginFrame):
        frame.grid(row = 0, column = 0, sticky='nsew')

    show_Frame(loginFrame)
    screen.protocol("WM_DELETE_WINDOW", on_close)
    screen.mainloop()

def on_frontpage_bind(event):
    Label(content_frame, text = "          ", bg = bg_color, font = ("Times", 92)).grid(row = 3, column = 0)

def os_music_detect(song):
    if os.name == 'nt':
        return MP3(song)

    elif os.name == 'posix' and 'Lunix' in platform.system():
        return OGG(song)

    else:
        return MP3(song)

def os_detect(windows, linux, mac):
    # detect windows os
    if os.name == 'nt':
        return windows
    
    # detect linux os
    elif os.name == 'posix' and 'Linux' in platform.system():
        return linux
    
    # detect mac os
    else:
        return mac

os_detect(pygame.mixer.init(), NONE, NONE)

def playlist_save(x):
    if playlist_string.get() == "Save Playlist":
        save()
    if playlist_string.get() == "Load Playlist":
        load()

def delete_song_menu(x):
    if deleted_string.get() == "Delete selected":
        delete()
    if deleted_string.get() == "Delete All":
        delete_all()

def add(x):
    if added_string.get() == "Add song":
        add_song()
    if added_string.get() == "Add multiple songs":
        add_multi_songs()

def save():
    #Grabs the songs
    songs = playlist_box.get(0, END)
    saved_list = []
    for song in songs:
        song_os = os_detect(f"{song}.mp3", f"{song}.ogg", f"{song}.mp3")
        song = song_os
        saved_list.append(song)

    #filename
    filename = filedialog.asksaveasfilename(title = "Save Playlist", filetypes = (("Dat file save", "*.dat"), ))

    #open file
    output_file = open(filename, 'wb')

    #Actually add the data
    pickle.dump(saved_list, output_file)

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")

def load():
    # filename
    filename = filedialog.askopenfilename(title = "Load Playlist", filetypes = (("Dat file save", "*.*"),))
    #open file
    input_file = open(filename, 'rb')

    #Load data from file into variable
    songs = pickle.load(input_file)

    #Clearing playlist before
    playlist_box.delete(0, END)

    for song in songs:
        # strip dir info
        song_replace_os = os_detect(".mp3", ".ogg", ".mp3")
        song = song.replace(song_replace_os, "")

        # insert into playlist
        playlist_box.insert(END, song)

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")

#Volume functions
def event_volume(event):
    volume_bar.config(value = 0)
    volume(None)

def volume(x):
    pygame.mixer.music.set_volume(volume_bar.get())

    #Get the Volume
    current_volume = pygame.mixer.music.get_volume()
    volume_label.config(text = int(current_volume * 100))

    if volume_label['text'] == '99':
        volume_label.config(text = '100')
    else:
        pass

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")

#Grab song length and info
def play_time():
    #Check for doubles
    if stopped:
        return

    current_time = pygame.mixer.music.get_pos() / 1000

    # slider_label.config(text = f"Slider: {int(elapsed_bar['value'])} and Song Position: {int(current_time)}")

    converted_time = time.strftime('%M:%S', time.gmtime(current_time))

    # Get the length
    # play next song in the playlist
    current_song = playlist_box.curselection()
    # Grab the song name and location
    song = playlist_box.get(ACTIVE)
    # Play dat stuff
    song_player = os_detect(f"{song}.mp3", f"{song}.ogg", f"{song}.mp3")
    song = song_player
    # MUTAGEN
    song_mtg = os_music_detect(song)

    global song_length
    song_length = song_mtg.info.length

    # Convert to time format
    converted_song_length = time.strftime('%M:%S', time.gmtime(song_length))

    current_time += 1
    if int(elapsed_bar.get()) == int(song_length):
        status_bar1.config(text = f"{converted_song_length}")
        status_bar1.config(text = f"{converted_song_length}")
        next_song()
    elif paused:
        pass
    elif int(elapsed_bar.get()) == int(current_time):
        #slider hasn't been moved
        sliders_pos = int(song_length)
        elapsed_bar.config(to = sliders_pos, value = int(current_time))
    else:
        #slider has been moved
        sliders_pos = int(song_length)
        elapsed_bar.config(to = sliders_pos, value = int(elapsed_bar.get()))

        converted_time = time.strftime('%M:%S', time.gmtime(int(elapsed_bar.get())))

        status_bar1.config(text = f"{converted_time}")
        status_bar2.config(text = f"{converted_song_length}")

        #Moving the slider
        next_time = int(elapsed_bar.get()) + 1
        elapsed_bar.config(value = next_time)

    # status_bar.config(text = f"Time Elapsed: {converted_time} of {converted_song_length}   ")

    #Update the position of the slider
    # elapsed_bar.config(to = sliders_pos, value = int(current_time))

    status_bar1.config(bg = "white")
    status_bar2.config(bg = "white")
    status_frame.after(1000, play_time)

def add_song():
    search_song = filedialog.askopenfilename(title="Choose A Song", filetypes = (("MP3 files", "*.mp3"), ("OGG Files", "*.ogg")))

    #strip dir info
    search_song_os = os_detect(".mp3", ".ogg",".mp3")
    search_song = search_song.replace(search_song_os, "")

    #Adding song to the list box
    playlist_box.insert(END, search_song)

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")

def play():
    global stopped
    stopped = False

    #play song
    play = playlist_box.get(ACTIVE)
    song_os_2 = os_detect(f"{play}.mp3", f"{play}.ogg", f"{play}.mp3")
    song = song_os_2

    pygame.mixer.music.load(song)
    pygame.mixer.music.play(loops = 0)

    elapsed_bar.config(value = 0)

    #Call the playtime function to update the timer
    play_time()

    #Update slider to that position
    # sliders_pos = int(song_length)
    # elapsed_bar.config(to=sliders_pos, value = 0)

    current_volume = pygame.mixer.music.get_volume()

    volume_label.config(text = int(current_volume * 100))

    status_bar1.config(bg = "white")
    status_bar2.config(bg = "white")

############################################
global stopped
stopped = False
def stop():
    #Reset Slider
    elapsed_bar.config(value=0)

    #Stop it
    pygame.mixer.music.stop()
    playlist_box.selection_clear(ACTIVE)

    #Clear The Status Bar
    status_bar1.config(text='')
    status_bar2.config(text='')

    #A status!
    global stopped
    stopped = True

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")
############################################
global paused
paused = False

def pause(isPaused):
    global paused
    paused = isPaused

    if paused:
        # Unpause current song
        pygame.mixer.music.unpause()
        paused = False
    else:
        #Pause current song
        pygame.mixer.music.pause()
        paused = True

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")

def add_multi_songs():
    search_songs = filedialog.askopenfilenames(title = "Choose A Song",
                                             filetypes = (("MP3 files", "*.mp3"), ("OGG Files", "*.ogg")))

    # Loop through song list and options to add to opperations list'
    for song in search_songs:
        # strip dir info
        song_replace_os_2 = os_detect(".mp3", ".ogg", ".mp3")
        song = song.replace(song_replace_os_2, "")

        #insert into playlist
        playlist_box.insert(END, song)

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")

def next_song():
    #Reset Slider
    elapsed_bar.config(value = 0)
    status_bar1.config(text = '')
    status_bar2.config(text = '')

    #play next song in the playlist
    next_one = playlist_box.curselection()

    #next song add in
    next_one = next_one[0]+1
    #Grab the song name and location
    song = playlist_box.get(next_one)

    #Play dat stuff
    song_os_3 = os_detect(f"{play}.mp3", f"{play}.ogg", f"{play}.mp3")
    song = song_os_3
    pygame.mixer.music.load(song)
    pygame.mixer.music.play(loops = 0)

    #change selection
    playlist_box.selection_clear(0, END)
    playlist_box.activate(next_one)
    playlist_box.selection_set(next_one)

    status_bar1.config(bg = "white")
    status_bar2.config(bg = "white")

def prev():
    #Reset Slider
    elapsed_bar.config(value = 0)
    status_bar1.config(text = '')
    status_bar2.config(text = '')

    # play next song in the playlist
    next_one = playlist_box.curselection()

    # next song add in
    next_one = next_one[0]-1
    # Grab the song name and location
    song = playlist_box.get(next_one)

    # Play dat stuff
    song_os_4 = os_detect(f"{play}.mp3", f"{play}.ogg", f"{play}.mp3")
    song = song_os_4
    pygame.mixer.music.load(song)
    pygame.mixer.music.play(loops = 0)

    # change selection
    playlist_box.selection_clear(0, END)
    playlist_box.activate(next_one)
    playlist_box.selection_set(next_one)

    status_bar1.config(bg = "white")
    status_bar2.config(bg = "white")

def delete():
    stop()

    #delete a song
    playlist_box.delete(ANCHOR)
    pygame.mixer.music.stop()

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")

def delete_all():
    stop()

    #delete all songs
    playlist_box.delete(0, END)
    pygame.mixer.music.stop()

    status_bar1.config(bg = "tan")
    status_bar2.config(bg = "tan")

def slide(x):
    global elapsed_time_converted
    elapsed_time_converted = time.strftime("%M:%S", time.gmtime(int(elapsed_bar['value'])))

    global song_length
    global convert_mp3_length
    convert_mp3_length = time.strftime("%M:%S", time.gmtime(int(song_length)))

    # play song
    play = playlist_box.get(ACTIVE)
    song_os_5 = os_detect(f"{play}.mp3", f"{play}.ogg", f"{play}.mp3")
    song = song_os_5

    pygame.mixer.music.load(song)
    pygame.mixer.music.play(loops = 0, start = int(elapsed_bar['value']))
    status_bar1.config(bg = "white")
    status_bar2.config(bg = "white")

def OnCheckEnter(event):
    try:
        if entry.get() == "Math Class":
            showFrame(frame1)
        elif entry.get() == "Math":
            showFrame(frame1)
        if entry.get() == "Science Class":
            showFrame(frame2)
        elif entry.get() == "Science":
            showFrame(frame2)
        if entry.get() == "English Class":
            showFrame(frame3)
        elif entry.get() == "English":
            showFrame(frame3)
        if entry.get() == "History Class":
            showFrame(frame4)
        elif entry.get() == "History":
            showFrame(frame4)
        if entry.get() == "Foreign Languages Class":
            showFrame(frame5)
        elif entry.get() == "Foreign":
            showFrame(frame5)
        if entry.get() == "Student Resources Department":
            studentrecstartup()
        elif entry.get() == "Student":
            studentrecstartup()
        elif entry.get() == "Stu":
            studentrecstartup()
        if entry.get() == "Geometry":
            showFrame(geoFrame)
        elif entry.get() == "Geo":
            showFrame(geoFrame)
        if entry.get() == "Algebra":
            showFrame(algFrame)
        elif entry.get() == "Alg":
            showFrame(algFrame)
        if entry.get() == "Trigonometry":
            showFrame(trig_frame)
        elif entry.get() == "Trig":
            showFrame(trig_frame)
        if entry.get() == "Exponents^2":
            showFrame(exponentFrame)
        elif entry.get() == "Exp":
            showFrame(exponentFrame)
        if entry.get() == "Chemistry":
            showFrame(chemFrame)
        elif entry.get() == "Chem":
            showFrame(chemFrame)
        if entry.get() == "Advanced Writing":
            showFrame(engFrame)
        if entry.get() == "Search Wikipedia":
            showFrame(wikiFrame)
        if entry.get() == "Spanish":
            showFrame(translatorFrame)
        elif entry.get() == "Span":
            showFrame(translatorFrame)
        if entry.get() == "Books & Answer Keys":
            studentrecstartup()
        elif entry.get() == "Books":
            studentrecstartup()
        if entry.get() == "Feedback":
            studentrecstartup()
    except Exception as e:
        pass

def OndeleteEntry(event):
    entry.delete(0, END)
    blocker = Frame(content_frame, bg = bg_color).grid(row = 3, column = 0)
    Label(content_frame, text = "         ", bg = bg_color, font = ("Times", 90)).grid(row = 3, column = 0)

def check(event):
    global search_box
    search_box = Listbox(content_frame, width = 25, height = 6, font = ("Times", 15))
    search_box.bind("<<ListboxSelect>>", fill_out_bar)
    entry.bind("<BackSpace>", on_frontpage_bind)
    search_box.grid(row = 3, column = 0)

    searched = entry.get()
    if searched == '':
        data = classes
        update(data)
    else:
        data = []
        for item in classes:
            if searched.lower() in item.lower():
                data.append(item)
                update(data)    

def fill_out_bar(event):
    try:
        entry.delete(0, END)
        entry.insert(0, search_box.selection_get())
        if search_box.selection_get() == "Math Class":
            showFrame(frame1)
        if search_box.selection_get() == "Science Class":
            showFrame(frame2)
        if search_box.selection_get() == "English Class":
            showFrame(frame3)
        if search_box.selection_get() == "History Class":
            showFrame(frame4)
        if search_box.selection_get() == "Foreign Languages Class":
            showFrame(frame5)
        if search_box.selection_get() == "Student Resources Department":
            studentrecstartup()
        if search_box.selection_get() == "Geometry":
            showFrame(geoFrame)
        if search_box.selection_get() == "Algebra":
            showFrame(algFrame)
        if search_box.selection_get() == "Trigonometry":
            showFrame(trig_frame)
        if search_box.selection_get() == "Exponents^2":
            showFrame(exponentFrame)
        if search_box.selection_get() == "Chemistry":
            showFrame(chemFrame)
        if search_box.selection_get() == "Advanced Writing":
            showFrame(engFrame)
        if search_box.selection_get() == "Search Wikipedia":
            showFrame(wikiFrame)
        if search_box.selection_get() == "Spanish":
            showFrame(translatorFrame)
        if search_box.selection_get() == "Books & Answer Keys":
            studentrecstartup()
        if search_box.selection_get() == "Feedback":
            studentrecstartup()
    except Exception as e:
        pass

def update(widget_data):
    search_box.delete(0, END)
    for e in widget_data:
        search_box.insert(END, e)

def on_delete_SPN(event):
    translator_entry.delete(0, END)

def on_delete_HTY(event):
    search_bar2.delete(0, END)

def on_delete_ENG2(event):
    search_bar.delete(0, END)

def on_delete_ENG1(event):
    file_finder.delete(0, END)

def on_delete_CHEM1(event):
    e_chem.delete(0, END)

def on_delete_EXP2(event):
    e_expo2.delete(0, END)

def on_delete_EXP1(event):
    e_expo.delete(0, END)

def on_delete_TRIG4(event):
    e_trig4.delete(0, END)

def on_delete_TRIG3(event):
    e_trig3.delete(0, END)

def on_delete_TRIG2(event):
    e_trig2.delete(0, END)

def on_delete_TRIG1(event):
    e_trig.delete(0, END)

def on_delete_ALG4(event):
    e_alg4.delete(0, END)

def on_delete_ALG3(event):
    e_alg3.delete(0, END)

def on_delete_ALG2(event):
    e_alg2.delete(0, END)

def on_delete_ALG1(event):
    e_alg.delete(0, END)

def on_delete_GEO3(event):
    e_geo_field3.delete(0, END)

def on_delete_GEO2(event):
    e_geo_field2.delete(0, END)

def on_delete_GEO1(event):
    e_geo_field.delete(0, END)

def word_translate(word):
    get_word = word.get()

    ref_word = Wordreference(get_word).search()

def google_translate(word):
    get_word = word.get()

    get_translation = Google_Translate(get_word).detect_language()

def wiki_pedia_search():
    var = historyInput.get()
    var_wiki = Wikipedia(var).search()

    wiki_search_results_window = Toplevel(root)
    wiki_search_results_window.geometry("1000x900")
    wiki_func = Frame(wiki_search_results_window, bg = bg_color)
    wiki_func.pack(side = RIGHT, fill = BOTH)

    Label(wiki_func, text = '', bg = bg_color).grid(row = 0, pady = 100)

    wiki_label = Label(wiki_func, text = 'You can scroll through the\ninformation with your mouse wheel', font = ('Palatino', 20), bg = bg_color)
    wiki_label.grid(row = 1, pady = 20)

    wiki_bck_btn = Button(wiki_func, text = 'Back', font = ('lato', 20),command = wiki_search_results_window.destroy)
    wiki_bck_btn.grid(row = 2)

    wiki_search_results = Text(wiki_search_results_window, height = 50, width = 150, font = ('lato', 14))
    wiki_search_results.pack(pady = 20, padx = 15)

    wiki_search_results.insert('1.0', f'{var_wiki}')

def ENG_websters_dictionary():
    web_search = user_search.get()

    web_reply = Merriam_Webster(web_search).word_search()

def ENG_mla_c():
    mla = MLA_Checker(eng_file_input.get()).checker_main()

    mla_info = Tk()
    mla_info.title('Modern Language Association')


    '''Correction Needed'''
    imgos3 = os_detect('C:/ProgramData/AStudyPal/venv/Images/favicon.ico', "@/usr/lib/astudypal/venv/Images/wized_logo5.jpg.xbm", NONE)
    mla_info.iconbitmap(imgos3)
    mla_sum = Label(mla_info, text = f'{mla}', font = ('Palatino', 20))
    mla_sum.pack()

def ENG_file_l():
    var = text_box.get('1.0', 'end-1c')

    var_letters = Letter_Percentage(eng_file_input.get()).letter_main()

    albs = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'

    count = 0

    for char in albs:
        for v in var:
            if v == char:
                count += 1


    letter_info = Tk()
    letter_info.title('Letter Percentage')


    '''Correction NEEDED'''
    imgos4 = os_detect('C:/ProgramData/AStudyPal/venv/Images/favicon.ico', "@/usr/lib/astudypal/venv/Images/wized_logo5.jpg.xbm", NONE)
    letter_info.iconbitmap(imgos4)
    app_width = 400
    app_height = 300
    letter_info.geometry(f"{app_width}x{app_height}+{0}+{300}")

    # Create a main frame
    main_frame_letter_percentage = Frame(letter_info)
    main_frame_letter_percentage.pack(fill = BOTH, expand = 10)

    # Create a Canvas
    my_canvas_letter_percentage = Canvas(main_frame_letter_percentage)
    my_canvas_letter_percentage.pack(side = LEFT, fill = BOTH, expand = 10)

    # add scrollbar to canves
    my_scrollbar_letter_percentage = ttk.Scrollbar(main_frame_letter_percentage, orient = VERTICAL, command = my_canvas_letter_percentage.yview)
    my_scrollbar_letter_percentage.pack(side = RIGHT, fill = Y)

    # Configure the Canvas
    my_canvas_letter_percentage.configure(yscrollcommand = my_scrollbar_letter_percentage.set)
    my_canvas_letter_percentage.bind('<Configure>', lambda e: my_canvas_letter_percentage.configure(scrollregion = my_canvas_letter_percentage.bbox("all")))

    # Create ANOTHER Frame Inside the Canvas
    second_frame_letter_percentage = Frame(my_canvas_letter_percentage)

    # Add that new frame to a window in the canvas
    my_canvas_letter_percentage.create_window((0, 0), window = second_frame_letter_percentage, anchor = "nw")

    letter_count_label = Label(second_frame_letter_percentage, text = f'Letter Count: {count}', font = ('Palatino', 20))
    letter_count_label.pack()

    letter_info_percentage = Label(second_frame_letter_percentage, text = f'Letter Percentages: \n{var_letters}', font = ('Palatino', 20))
    letter_info_percentage.pack(pady = 10)

def ENG_file_n():
    text_box.delete('1.0', 'end-1c')

    global var

    var = eng_file_input.get()

    global result_var
    global result_varlines

    result_var = Resources(var).get_file()
    result_varlines = Resources(var).get_lines()

    text_box.insert('1.0', result_var)

def CHEM_element_f(count):
    count += 1

    el_val = element.get()

    get_el_info = Chemistry(el_val).element_info()
    elect_info['text'] = f'{get_el_info}'

    el_len_val = len(el_val)

    if el_len_val > 2:
        elect_info['text'] = 'ELEMENT SYMBOL'

    if el_val.islower():
        elect_info['text'] = 'Your Symbol Has to be Upper Case'

    e_chem.delete(0, END)

def EXP_powers_Custom():
    expo_val = power_1.get()
    expo_val2 = power_2.get()

    if expo_val >= 0 or expo_val2 >= 0:
        solved_expo_label.config(fg = 'black')

    try:
        expo_sum = Exponents(expo_val, expo_val2).powCustom()
        solved_expo_label['text'] = f"Answer is: {str(expo_sum)}"

    except Exception as e:
        solved_expo_label.config(fg = 'red')
        solved_expo_label['text'] = f"Input too large"
        time.sleep(2)

    except IOError as i:
        solved_expo_label['text'] = f"IO error {str(i)}"


    e_expo.delete(0, END)
    e_expo2.delete(0, END)

def EXP_powers_3():

    try:
        expo_val = power_1.get()
        exp_sum = Exponents(expo_val, NONE).pow3()
        solved_expo_label['text'] = f"Answer is: {str(exp_sum)}"
    except Exception as e:
        solved_expo_label.config(text = f'{EITHER_error} or\n{proc_error}')

    e_expo.delete(0, END)
    if expo_seeval > 0:
        e_expo2.delete(0, END)

def EXP_powers_2():

    try:
        exp_val = power_1.get()
        exp_sum = Exponents(exp_val, NONE).pow2()
        solved_expo_label['text'] = f"Answer is:  {str(exp_sum)}"
    except Exception as e:
        solved_expo_label.config(text = f'{EITHER_error} or\n{proc_error}')

    e_expo.delete(0, END)
    if expo_seeval > 0.0:
        e_expo2.delete(0, END)

def ALG_slope_rs():

    try:
        geo_val = alg_float.get()
        geo_val2 = alg_floater.get()
        geo_sum = Algebra(geo_val, geo_val2, NONE, NONE).rate_change()
        solved_alg_label['text'] = f"Answer is: m = {str(geo_sum)}"
    except Exception as e:
        solved_alg_label.config(text = f"{EITHER_error} or\n{proc_error}")

    e_alg.delete(0, END)
    e_alg2.delete(0, END)

def ALG_slope_s():

    try:
        geo_val = alg_float.get() #y2
        geo_val2 = alg_floater.get() #y1
        geo_val3 = alg_floaterfloating.get() #x2
        geo_val4 = alg_floaterfloatingCloud.get() #x1
        geo_sum = Algebra(geo_val, geo_val2, geo_val3, geo_val4).slope()
        solved_alg_label['text'] = f"Answer is: y = {str(geo_sum)}x + b"

    except Exception as e:
        solved_label.config(text = f"{EITHER_error} or\n{proc_error}")

    e_alg.delete(0, END)
    e_alg2.delete(0, END)
    e_alg3.delete(0, END)
    e_alg4.delete(0, END)

    e_alg.insert(END, "y2")
    e_alg2.insert(END, "y1")
    e_alg3.insert(END, "x2")
    e_alg4.insert(END, "x1")

    root.update()
    root.update_idletasks()

    threading.Thread(time.sleep(2.5)).start()

    e_alg.delete(0, END)
    e_alg2.delete(0, END)
    e_alg3.delete(0, END)
    e_alg4.delete(0, END)

def ALG_slope_i():

    try:
        geo_val = alg_float.get()
        geo_val2 = alg_floater.get()
        geo_sum = Algebra(geo_val, geo_val2, NONE, NONE).slope_int()
        solved_alg_label['text'] = f"Slope intercept form is: {str(geo_sum)}"
    except Exception as e:
        solved_label.config(text = f"{EITHER_error} or\n{proc_error}")

    e_alg.delete(0, END)
    e_alg2.delete(0, END)

def GEO_sector():

    try:
        geo_val = geo_float.get()
        geo_val2 = geo_floater.get()
        geo_sum = Geometry(3.14, geo_val, geo_val2, NONE).sector_area()
        solved_label['text'] = f"Answer is: {str(geo_sum)}"
    except Exception as e:
        solved_label.config(text = f'{EITHER_error} or\n{proc_error}')

    e_geo_field.delete(0, END)
    e_geo_field2.delete(0, END)

def GEO_circle_d():

    try:
        geo_val = geo_float.get()
        geo_sum = Geometry(3.14, geo_val, NONE, NONE).circ_diameter()
        solved_label['text'] = f"Answer is: {str(geo_sum)}"
    except Exception as e:
        solved_label.config(text = f'{proc_error}')
        return
    if geo_floater.get() > 0 or geo_floaterfloating.get() > 0:
        solved_label.config(text = f'{Entry_error}')
        return

    e_geo_field.delete(0, END)

def GEO_circle_c():

    try:
        geo_val = geo_float.get()
        geo_sum = Geometry(3.14, geo_val, NONE, NONE).circ_circumference()
        solved_label['text'] = f"Answer is: {str(geo_sum)}"
    except Exception as e:
        solved_label.config(text = f'{proc_error}')
        return
    if geo_floater.get() > 0 or geo_floaterfloating.get() > 0:
        solved_label.config(text = f"{Entry_error}")
        return

    e_geo_field.delete(0, END)

def GEO_circle_a():

    try:
        geo_val = geo_float.get()
        geo_sum = Geometry(3.14, geo_val, geo_val2, geo_val3).circ_area()
        solved_label['text'] = f"Answer is: {str(geo_sum)}"
    except Exception as e:
        solved_label.config(text = f'This could not be processed')
        return

    if geo_floater.get() > 0 or geo_floaterfloating.get() > 0:
        solved_label.config(text = f'There are not enough entry boxes filled')
        return

    e_geo_field.delete(0, END)

def Geo_triangle_p():

    try:
        geo_val = trig_float.get()
        geo_val2 = trig_floater.get()
        geo_val3 = trig_floaterfloating.get()
        geo_sum = Geometry(3.14, geo_val, geo_val2, geo_val3).trig_perimeter()
        solved_trig_label['text'] = f"Answer is: {str(geo_sum)}"
    except Exceptions as e:
        solved_label.config(text = f"{EITHER_error} or {proc_error}")

    e_trig.delete(0, END)
    e_trig2.delete(0, END)
    e_trig3.delete(0, END)

def GEO_triangle_h():

    try:
        geo_val = trig_float.get()
        geo_val2 = trig_floater.get()
        geo_sum = Geometry(3.14, geo_val, geo_val2, NONE).trig_hypo()
        solved_trig_label['text'] = f"Answer is: {str(geo_sum)}"
    except Exception as e:
        solved_label.config(text = f"{EITHER_error} or\n{proc_error}")

    e_trig.delete(0, END)
    e_trig2.delete(0, END)

def GEO_triangle_a():

    try:
        geo_val = trig_float.get()
        geo_val2 = trig_floater.get()
        geo_sum = Geometry(3.14, geo_val, geo_val2, NONE).trig_area()
        solved_trig_label['text'] = f"Answer is: {str(geo_sum)}"
    except Exception as e:
        solved_label.config(text = f"{EITHER_error} or\n{proc_error}")

    e_trig.delete(0, END)
    e_trig2.delete(0, END)

def GEO_quad_p():
    try:
        geo_value = geo_float.get()
        geo_value_2 = geo_floater.get()
        geo_value = Geometry(3.14, geo_value, geo_value_2, NONE).quad_perimeter()
        solved_label['text'] = f"Answer is: {str(geo_value)}"
    except Exception as e:
        solved_label.config(text = f"{EITHER_error} or {proc_error}")

    e_geo_field2.delete(0, END)
    e_geo_field.delete(0, END)

def GEO_quad_a():

    try:
        geo_solve = geo_float.get()
        geo_solver = geo_floater.get()
        geo_solving = Geometry(3.14, geo_solve, geo_solver, NONE)
        geo_solved = geo_solving.quad_area()

        solved_label['text'] = f"Answer is: {str(geo_solved)}"
    except Exception as e:
        solved_label.config(text = f"Either there are not enough entry boxes filled or\nThis could not be processed")
        return

    e_geo_field.delete(0, END)
    e_geo_field2.delete(0, END)

def showFrame(frame):
    frame.tkraise()

def sturec():
    studentrecstartup()

def Open_web(website):
    webbrowser.open(f"{website}")

#authentication page
authentication_screen()
#--------------------------------------------------------------------------------------------------------------------------#
#Main Window, root of the layout, and added tools

root = Tk()
root.title('AStudyPal')
root.geometry('950x950')

window_os = os_detect('zoomed', 'normal', 'normal')
root.state(f"{window_os}")

'''Correction NEEDED'''
imgos5 = os_detect('C:/ProgramData/AStudyPal/venv/Images/favicon.ico', "@/usr/lib/astudypal/venv/Images/wized_logo5.jpg.xbm", NONE)
root.iconbitmap(imgos5)
root.config(bg = 'light grey')

############################################################################################################################
'''Essentials'''
bg_color = 'light grey'
EITHER_error = 'Either there are not enough entry boxes filled'
Entry_error = 'There are not enough entry boxes filled'
proc_error = 'This could not be processed'
root.rowconfigure(0, weight = 1)
root.columnconfigure(0, weight = 1)
#--------------------------------------------------------------------------------------------------------------------------#

#First Frame
frame1 = Frame(root, bg='dark grey')
frame_title = Label(frame1, text = 'This is your Math guide', font = ('Times', 30))
frame_title.pack(fill = 'x')

############################################################################################################################
in_frame = Frame(frame1, bg='black')
in_frame.pack(side = LEFT, anchor = 'nw')

bck_btn = Button(in_frame, font = ('Comic Sans MS', 19), text='Table Of Contents', command= lambda : showFrame(frame6))
bck_btn.grid(row = 1, column = 0, padx = 13, pady = 10)

geo_btn_screen = Button(in_frame, font = ('Comic Sans MS', 12), text='Geometry', width = 15, height = 2, command = lambda : showFrame(geoFrame))
geo_btn_screen.grid(row = 2, column = 0, padx = 12, pady = 15)


alg_btn_screen = Button(in_frame, text = "Algebra", width = 15, height = 2, font = ('Comic Sans MS', 12), command = lambda : showFrame(algFrame))
alg_btn_screen.grid(row = 3, column = 0)


trig_btn_screen = Button(in_frame, text = "Trigonometry", width = 15, height = 2, font = ('Comic Sans MS', 12), command = lambda : showFrame(trig_frame))
trig_btn_screen.grid(row = 4, column = 0, pady = 10)

#I dun know just put whatever a polynomial variable is

powers_btn = Button(in_frame, text = 'Exponents^2', font = ('Comic Sans MS', 12), height = 2, width = 15, command = lambda : showFrame(exponentFrame))
powers_btn.grid(row = 9, column = 0, pady = 3)
###########################################################################################################################
imgos6 = os_detect('C:/ProgramData/AStudyPal/venv/Images/math.png', "/usr/lib/astudypal/venv/Images/math.png", NONE)
image = Image.open(imgos6)
image = ImageTk.PhotoImage(image)
label_img = Label(frame1, text = 'image')
label_img.configure(image = image)
label_img.pack()
#################################################################################################################################################
#Math frame
#Geometry Panel
geoFrame = Frame(root, bg = 'light grey')

###############################################################################################################
#Do not touch that region

# Create a main frame
main_frame = Frame(geoFrame)
main_frame.pack(fill = BOTH, expand = 10, side = RIGHT)

# Create a Canvas
my_canvas = Canvas(main_frame, bg = 'light grey')
my_canvas.pack(side = LEFT, fill = BOTH, expand = 10)

# add scrollbar to canves
my_scrollbar = ttk.Scrollbar(main_frame, orient = VERTICAL, command = my_canvas.yview)
my_scrollbar.pack(side = RIGHT, fill = Y)

# Configure the Canvas
my_canvas.configure(yscrollcommand = my_scrollbar.set)
my_canvas.bind('<Configure>', lambda e: my_canvas.configure(scrollregion = my_canvas.bbox("all")))

global second_frame
# Create ANOTHER Frame Inside the Canvas
second_frame = Frame(my_canvas, bg = 'light grey')

# Add that new frame to a window in the canvas
my_canvas.create_window((0, 0), window = second_frame, anchor = "nw")
###########################################################################################################

geoTitle = Label(geoFrame, text = 'Geometry', font = ('Times', 60), bg = 'light grey')
geoTitle.pack(side = TOP, fill = 'x', pady = 25)

geo_info = Label(geoFrame, text = 'Welcome to Geometry, this is where you can check up on basic geometry.', font = ('Orbitron', 18), bg = 'light grey')
geo_info.pack(pady = 30, padx = 30)

space_label = Label(geoFrame, text = "", bg = 'light grey')
space_label.pack()

###############
#Future Ref
#float = geo_float.get()
###############

geo_float = DoubleVar()
geo_floater = DoubleVar()
geo_floaterfloating = DoubleVar()

Label(geoFrame, text = "", bg = 'light grey').pack()

solved_label = Label(geoFrame, text = f"Answer is: ", font = ('lato', 35), bg = bg_color)
solved_label.pack()

e_geo_field = Entry(geoFrame, textvariable = geo_float, width = 30, font = ('lato', 20), borderwidth = 6)
e_geo_field.bind("<Control_L>"+"<d>", on_delete_GEO1)
e_geo_field.pack(pady = 15)

e_geo_field2 = Entry(geoFrame, textvariable = geo_floater, width = 30, font = ('lato', 20), borderwidth = 6)
e_geo_field2.bind("<Control_L>"+"<d>", on_delete_GEO2)
e_geo_field2.pack(pady = 15)

Label(geoFrame, text = 'This textbox is used to find the complete perimeter of an object in cohesion with the other textboxes', bg = bg_color,font = ('lato', 15), borderwidth = 2).pack(pady = 5)

e_geo_field3 = Entry(geoFrame, textvariable = geo_floaterfloating, width = 30, font = ('lato', 20), borderwidth = 6)
e_geo_field3.bind("<Control_L>"+"<d>", on_delete_GEO3)
e_geo_field3.pack(pady = 15)

Label(second_frame, bg = bg_color, text = 'Calculations', font = ("Garamound", 20), borderwidth = 2).pack(pady = 20, padx = 100)

geo_calculate = Button(second_frame, text = 'Area of a Quadrilateral', width = 20, height = 1, font = ('Palatino', 20), command = GEO_quad_a)
geo_calculate.pack()

Label(second_frame, text = "", bg = 'light grey').pack(pady = 10)

geo_calculate_2 = Button(second_frame, text = 'Perimeter of a Quadrilateral', width = 20, height = 1, font = ('Palatino', 20), command = GEO_quad_p)
geo_calculate_2.pack()

Label(second_frame, text = "", bg = 'light grey').pack(pady = 10)

geo_calculate_6 = Button(second_frame, text = "Area of Circle", width = 20, height = 1, font = ('Palatino', 20), command = GEO_circle_a)
geo_calculate_6.pack()

Label(second_frame, text = "", bg = bg_color).pack(pady = 10)

geo_calculate_6 = Button(second_frame, text = "Circumference of a Circle", width = 20, height = 1, font = ('Palatino', 20), command = GEO_circle_c)
geo_calculate_6.pack()

Label(second_frame, text = "", bg = bg_color).pack(pady = 10)

geo_calculate_7 = Button(second_frame, text = "Diameter of Circle", width = 20, height = 1, font = ('Palatino', 20), command = GEO_circle_c)
geo_calculate_7.pack()

Label(second_frame, text = "", bg = bg_color).pack(pady = 10)

geo_calculate_8 = Button(second_frame, text = "Sector Area of Circle", width = 20, height = 1, font = ('Palatino', 20), command = GEO_circle_c)
geo_calculate_8.pack()

Label(second_frame, text = "", bg = bg_color).pack()

#Also a high backend area here

back_close1 = Button(second_frame, text = 'Main Menu', width = 12, height = 2, font = ('lato', 20), command = lambda : showFrame(frame1))
back_close1.pack()

Label(second_frame, text = "", bg = bg_color).pack()
############################################################################################################################
#Algebra Frame
algFrame = Frame(root, bg = bg_color)
############################################################################################################################

#Create a main frame
main_frame_alg = Frame(algFrame, bg = bg_color)
main_frame_alg.pack(fill=BOTH, expand = 10)

#Create a Canvas
my_canvas_alg = Canvas(main_frame_alg, bg = bg_color)
my_canvas_alg.pack(side=LEFT, fill=BOTH, expand=10)

#add scrollbar to canves
my_scrollbar_alg = ttk.Scrollbar(main_frame_alg, orient=VERTICAL, command=my_canvas_alg.yview)
my_scrollbar_alg.pack(side=RIGHT, fill=Y)

#Configure the Canvas
my_canvas_alg.configure(yscrollcommand=my_scrollbar_alg.set)
my_canvas_alg.bind('<Configure>', lambda e: my_canvas_alg.configure(scrollregion=my_canvas_alg.bbox("all")))

#Create ANOTHER Frame Inside the Canvas
second_frame_alg = Frame(my_canvas_alg, bg = bg_color)

#Add that new frame to a window in the canvas
my_canvas_alg.create_window((0, 0), window=second_frame_alg, anchor="nw")

###########################################################################################################################

algTitle = Label(second_frame_alg, text = 'Algebra', font = ('lato', 90), bg = bg_color)
algTitle.pack(pady = 20)

Label(second_frame_alg, text = 'Greatings, welcome to algebra.\n'
                               'Our team will be updating this page to keep content flowing.',
      font = ('Times', 28), bg = bg_color).pack(padx = 172)

Label(second_frame_alg)

alg_float = DoubleVar()
alg_floater = DoubleVar()
alg_floaterfloating = DoubleVar()
alg_floaterfloatingCloud = DoubleVar()

solved_alg_label = Label(second_frame_alg, text = 'Answer is: ', bg = bg_color, font = ('lato', 40))
solved_alg_label.pack(pady = 25)

e_alg = Entry(second_frame_alg, textvariable = alg_float, width = 16, font = ('Comic Sans MS', 19))
e_alg.bind("<Control_L>"+"<d>", on_delete_ALG1)
e_alg.pack(pady = 10)

e_alg2 = Entry(second_frame_alg, textvariable = alg_floater, width = 16, font = ('Comic Sans MS', 19))
e_alg2.bind("<Control_L>"+"<d>", on_delete_ALG2)
e_alg2.pack(pady = 10)

e_alg3 = Entry(second_frame_alg, textvariable = alg_floaterfloating, width = 16, font = ('Comic Sans MS', 19))
e_alg3.bind("<Control_L>"+"<d>", on_delete_ALG3)
e_alg3.pack(pady = 10)

e_alg4 = Entry(second_frame_alg, textvariable = alg_floaterfloatingCloud, width = 16, font = ('Comic Sans MS', 19))
e_alg4.bind("<Control_L>"+"<d>", on_delete_ALG4)
e_alg4.pack(pady = 10)

Label(second_frame_alg, text = "", bg = bg_color).pack()

alg_calc_btn = Button(second_frame_alg, text = "Slope Intercept Form", width = 17, height = 1, font = ('lato', 20),command = ALG_slope_i)
alg_calc_btn.pack()

Label(second_frame_alg, text = "", bg = bg_color).pack()

alg_calc_btn2 = Button(second_frame_alg, text = "Slope", width = 17, height = 1, font = ('lato', 20), command = ALG_slope_s)
alg_calc_btn2.pack()

Label(second_frame_alg, text = "", bg = bg_color).pack()

alg_calc_btn2 = Button(second_frame_alg, text = "Rate of Change", width = 17, height = 1, font = ('lato', 20), command = ALG_slope_rs)
alg_calc_btn2.pack()

Label(second_frame_alg, text = "", bg = bg_color).pack()

back_close1 = Button(second_frame_alg, text = 'Main Menu', width = 12, height = 2, font = ('lato', 20), command = lambda : showFrame(frame1))
back_close1.pack(pady = 20)

############################################################################################################################
trig_frame = Frame(root, bg = bg_color)

############################################################################################################################
#Create a main frame
main_frame_trig = Frame(trig_frame, bg = bg_color)
main_frame_trig.pack(fill=BOTH, expand = 10)

#Create a Canvas
my_canvas_trig = Canvas(main_frame_trig, bg = bg_color)
my_canvas_trig.pack(side=LEFT, fill=BOTH, expand=10)

#add scrollbar to canves
my_scrollbar_trig = ttk.Scrollbar(main_frame_trig, orient=VERTICAL, command=my_canvas_trig.yview)
my_scrollbar_trig.pack(side=RIGHT, fill=Y)

#Configure the Canvas
my_canvas_trig.configure(yscrollcommand=my_scrollbar_trig.set)
my_canvas_trig.bind('<Configure>', lambda e: my_canvas_trig.configure(scrollregion=my_canvas_trig.bbox("all")))

#Create ANOTHER Frame Inside the Canvas
second_frame_trig = Frame(my_canvas_trig, bg = bg_color)

#Add that new frame to a window in the canvas
my_canvas_trig.create_window((0, 0), window=second_frame_trig, anchor="nw")

############################################################################################################################
trig_title = Label(second_frame_trig, text = 'Trigonometry', font = ('lato', 90), bg = bg_color)
trig_title.pack(anchor = 'n', fill = 'x', pady = 10)

Label(second_frame_trig, text = '', bg = bg_color).pack()

trig_info = Label(second_frame_trig, text = 'Welcome to Trigonometry', font = ('Times', 28), bg = bg_color)
trig_info.pack()

Label(second_frame_trig, text = '', bg = bg_color).pack()

solved_trig_label = Label(second_frame_trig, text = 'Answer is: ', font = ('Palatino', 25), bg = bg_color)
solved_trig_label.pack()

trig_float = DoubleVar()
trig_floater = DoubleVar()
trig_floaterfloating = DoubleVar()

e_trig = Entry(second_frame_trig, textvariable = trig_float, width = 20, font = ('Comic Sans MS', 19))
e_trig.bind("<Control_L>"+"<d>", on_delete_TRIG1)
e_trig.pack(pady = 10)

e_trig2 = Entry(second_frame_trig, textvariable = trig_floater, width = 20, font = ('Comic Sans MS', 19))
e_trig2.bind("<Control_L>"+"<d>", on_delete_TRIG2)
e_trig2.pack(pady = 10)

e_trig3 = Entry(second_frame_trig, textvariable = trig_floaterfloating, width = 20, font = ('Comic Sans MS', 19))
e_trig3.bind("<Control_L>"+"<d>", on_delete_TRIG3)
e_trig3.pack(pady = 10)

Label(second_frame_trig, font = ('lato', 20), text = '                                                                                                                                                              ', bg = bg_color).pack()

trig_btn_calc = Button(second_frame_trig, text = 'Area of a Triangle', font = ('lato', 20), width = 20, height = 1, command = GEO_triangle_a)
trig_btn_calc.pack()

Label(second_frame_trig, text = '', bg = bg_color).pack()

trig_btn_calc = Button(second_frame_trig, text = 'Hypotenuse of a Triangle', width = 20, height = 1, font = ('lato', 20), command =  GEO_triangle_h)
trig_btn_calc.pack()

Label(second_frame_trig, text = '', bg = bg_color).pack()

trig_btn_calc = Button(second_frame_trig, text = 'Perimeter of a Triangle', font = ('lato', 20), width = 20, height = 1, command = Geo_triangle_p)
trig_btn_calc.pack()

Label(second_frame_trig, text = '', bg = bg_color).pack()

trig_btn_back = Button(second_frame_trig, text = 'Main Menu', width = 17, height = 1, font = ('lato', 20), command = lambda : showFrame(frame1))
trig_btn_back.pack()
############################################################################################################################
exponentFrame = Frame(root, bg = bg_color)
############################################################################################################################
main_expo_frame = Frame(exponentFrame)
main_expo_frame.pack(fill = BOTH, expand = 10)

my_canvas_expo = Canvas(main_expo_frame, bg = bg_color)
my_canvas_expo.pack(side = LEFT, fill = BOTH, expand = 10)

my_scrollbar_expo = ttk.Scrollbar(main_expo_frame, orient=VERTICAL, command=my_canvas_expo.yview)
my_scrollbar_expo.pack(side=RIGHT, fill=Y)

my_canvas_expo.configure(yscrollcommand=my_scrollbar_expo.set)
my_canvas_expo.bind('<Configure>', lambda e: my_canvas_expo.configure(scrollregion=my_canvas_expo.bbox("all")))

second_frame_expo = Frame(my_canvas_expo, bg = bg_color)

my_canvas_expo.create_window((0, 0), window=second_frame_expo, anchor="nw")
############################################################################################################################
exponent_title = Label(second_frame_expo, bg = bg_color, text = "Exponents^2", font = ('Palatino', 65))
exponent_title.grid(row = 0, column = 1)

expo_info = Label(second_frame_expo, text = "Welcome to the Exponenets", font = ('lato', 30), bg = bg_color)
expo_info.grid(row = 1, column = 1, pady = 25)

solved_expo_label = Label(second_frame_expo, text = "Answer is: ", font = ('lato', 30), bg = bg_color)
solved_expo_label.grid(row = 2, column = 1)

power_1 = DoubleVar()
power_2 = DoubleVar()

e_expo = Entry(second_frame_expo, textvariable = power_1, width = 25, font = ('Comic Sans MS', 20), borderwidth = 6)
e_expo.bind("<Control_L>"+"<d>", on_delete_EXP1)
e_expo.grid(row = 3, column = 1, pady = 10)

e_expo2 = Entry(second_frame_expo, textvariable = power_2, width = 25, font = ('Comic Sans MS', 20), borderwidth = 6)
e_expo2.bind("<Control_L>"+"<d>", on_delete_EXP2)
e_expo2.grid(row = 4, column = 1, pady = 10)

Label(second_frame_expo, bg = bg_color, text = '                                                                                                                                                                                                                                                                                                                                                                                                                                      ').grid(row = 5, column = 1)

###########################################################################################################################
expo_in_frame = Frame(second_frame_expo, bg = bg_color)
expo_in_frame.grid(row = 6, column = 1, pady = 30)

e_expo_calc = Button(expo_in_frame, text = 'x²', font = ('lato', 45), command = EXP_powers_2)
e_expo_calc.grid(row = 0, column = 0, padx = 5)

e_expo_calc2 = Button(expo_in_frame, text = 'x³', font = ('lato', 45), command = EXP_powers_3)
e_expo_calc2.grid(row = 0, column = 1, padx = 20)

e_expo_calc3 = Button(expo_in_frame, text = 'Custom', font = ('lato', 45), command = EXP_powers_Custom)
e_expo_calc3.grid(row = 0, column = 2, padx = 5)
############################################################################################################################
expo_bck = Button(second_frame_expo, text = 'Main Menu', font = ("Palatino", 30), command = lambda : showFrame(frame1))
expo_bck.grid(row = 11, column = 1)
############################################################################################################################
#Second Frame
frame2 = Frame(root, bg = 'dark grey')
frame_title2 = Label(frame2, text = 'This is your Science guide', font = ('Times', 20))
frame_title2.pack(fill = 'x')

############################################################################################################################
in_frame2 = Frame(frame2, bg='black')
in_frame2.pack(side = LEFT, anchor = 'nw', pady = 20)

bck_btn2 = Button(in_frame2, font = ('Comic Sans MS', 19), width = 17, height = 2, text='Table Of Contents', command= lambda : showFrame(frame6))
bck_btn2.grid(row = 2, column = 0, padx = 13, pady = 30)

Chemistry_btn_screen = Button(in_frame2, text = 'Chemistry', font = ('Comic Sans MS', 15), height = 2, width = 15, command = lambda : showFrame(chemFrame))
Chemistry_btn_screen.grid(row = 3, column = 0, pady = 12)

# Computer_btn_screen = Button(in_frame2, text='Computer Science', font = ('Comic Sans MS', 15), height = 2, width = 15)
# Computer_btn_screen.grid(row = 4, column = 0, padx = 15, pady = 12)
#
# scientific_notation = Button(in_frame2, text = "Scientific Notation", width = 15, height = 2, font = ('Comic Sans MS', 15))
# scientific_notation.grid(row = 5, column = 0, pady = 12)

imgos7 = os_detect('C:/ProgramData/AStudyPal/venv/Images/science.png', "/usr/lib/astudypal/venv/Images/science.png", NONE)
science_img = Image.open(imgos7)
science_img.thumbnail((350,350))
science_img = ImageTk.PhotoImage(science_img)
science_lbl = Label(frame2)
science_lbl.configure(image = science_img)
science_lbl.pack()
############################################################################################################################
chemFrame = Frame(root, bg = bg_color)

'''Correction NEEDED'''
imgos8 = os_detect('C:/ProgramData/AStudyPal/venv/Images/favicon.ico', "/usr/lib/astudypal/venv/Images/science.png", NONE)
element_img_2 = Image.open(imgos8)
element_img_2.thumbnail((350, 350))
element_img_2 = ImageTk.PhotoImage(element_img_2)

bck_chem_frame = Frame(chemFrame, bg = bg_color)
bck_chem_frame.pack(side = LEFT, anchor = 'nw')

bck_btn3 = Button(bck_chem_frame, bg = bg_color, image = element_img_2, borderwidth = 0, command = lambda : showFrame(frame2))
bck_btn3.pack()

periodic_table_frame = Frame(bck_chem_frame, bg = bg_color)
periodic_table_frame.pack(side = TOP, pady = 10)

periodic_table = Button(periodic_table_frame, text = "Periodic Table", font = ('Paletino', 25), command = lambda : showFrame(perioFrame))
periodic_table.pack(pady = 10, padx = 12)

############################################################################################################################

main_chem_frame = Frame(chemFrame)
main_chem_frame.pack(fill = BOTH, expand = 10)

my_canvas_chem = Canvas(main_chem_frame, bg = bg_color)
my_canvas_chem.pack(side = LEFT, fill = BOTH, expand = 10)

my_scrollbar_chem = ttk.Scrollbar(main_chem_frame, orient=VERTICAL, command=my_canvas_chem.yview)
my_scrollbar_chem.pack(side=RIGHT, fill=Y)

my_canvas_chem.configure(yscrollcommand=my_scrollbar_chem.set)
my_canvas_chem.bind('<Configure>', lambda e: my_canvas_chem.configure(scrollregion=my_canvas_chem.bbox("all")))

second_frame_chem = Frame(my_canvas_chem, bg = bg_color)

my_canvas_chem.create_window((0, 0), window=second_frame_chem, anchor="nw")
#################################################################################################################################################
chem_title = Label(second_frame_chem, text = 'Chemistry', font = ('lato', 65), bg = bg_color)
chem_title.pack(fill = X, expand = 1, padx = 420, pady = 10)

chem_info = Label(second_frame_chem, text = 'Welcome to Cheimstry.\nthis is where you will be able to study the Periodic Table,\nget down the basics of groups and periods,\nand take advantage of some of our tools', bg = bg_color, font = ('lato', 20))
chem_info.pack(pady = 5)

elect_info = Label(second_frame_chem, text = 'Put your desired Element', font = ('Garamound', 20), bg = bg_color)
elect_info.pack()

element = StringVar()

e_chem = Entry(second_frame_chem, textvariable = element, bd = 2, borderwidth = 6, width = 20, font = ('lato', 12))
e_chem.bind("<Control_L>"+"<d>", on_delete_CHEM1)
e_chem.pack()

imgos9 = os_detect('C:/ProgramData/AStudyPal/venv/Images/ElementFinderImage.png', "/usr/lib/astudypal/venv/Images/ElementFinderImage.png", NONE)
element_img = Image.open(imgos9)
element_img.thumbnail((350, 350))
element_img = ImageTk.PhotoImage(element_img)

chem_button_count = 0

e_chem_calc = Button(second_frame_chem, borderwidth = 0, command = lambda : CHEM_element_f(chem_button_count), bg = bg_color)
e_chem_calc.configure(image = element_img)
e_chem_calc.pack()

############################################################################################################################
perioFrame = Frame(root, bg = bg_color)

'''Correction NEEDED'''
imgos10 = os_detect('C:/ProgramData/AStudyPal/venv/Images/scienceMenu.png', "/usr/lib/astudypal/venv/Images/scienceMenu.png", NONE)
back_btn = Image.open(imgos10)
back_btn.thumbnail((350,350))
back_btn = ImageTk.PhotoImage(back_btn)

btn_img_bck = Button(perioFrame, image = back_btn, borderwidth = 0, command = lambda : showFrame(chemFrame), bg = bg_color)
btn_img_bck.pack(side = LEFT, padx = 35, anchor = 'nw')

main_perio_frame = Frame(perioFrame)
main_perio_frame.pack(fill = BOTH, expand = 10)

my_canvas_perio = Canvas(main_perio_frame, bg = bg_color)
my_canvas_perio.pack(side = LEFT, fill = BOTH, expand = 10)

my_scrollbar_perio = ttk.Scrollbar(main_perio_frame, orient=VERTICAL, command=my_canvas_perio.yview)
my_scrollbar_perio.pack(side=RIGHT, fill=Y)

my_canvas_perio.configure(yscrollcommand=my_scrollbar_perio.set)
my_canvas_perio.bind('<Configure>', lambda e: my_canvas_perio.configure(scrollregion=my_canvas_perio.bbox("all")))

second_frame_perio = Frame(my_canvas_perio, bg = bg_color)

my_canvas_perio.create_window((0, 0), window=second_frame_perio, anchor="nw")
#############################################################################################################################

perio_title = Label(second_frame_perio, text = 'Periodic Table', font = ('Palatino', 50), bg = bg_color)
perio_title.pack()

periodic_table_frame = Frame(second_frame_perio, bd = 5, borderwidth = 5, bg = 'cyan')
periodic_table_frame.pack(side = RIGHT)

p_open = Label(periodic_table_frame, text = '  -----                                                                                         -----\n'+
                                            '1 | H |                                                                                         |He |\n'+
                                            '  |----+----                                                           -----------------+---|\n'+
                                            '2 |Li |Be |                                                          | B | C | N | O | F |Ne |\n'+
                                            '  |---+---|                                                          |---+---+---+---+---+---|\n'+
                                            '3 |Na |Mg |3B  4B  5B  6B  7B |    8B    |1B  2B |Al |Si | P | S |Cl |Ar |\n'+
                                            '  |---+---+-------------------------------------------+---+---+---+---+---+---|\n'+
                                            '4 | K |Ca |Sc |Ti | V |Cr |Mn |Fe |Co |Ni |Cu |Zn |Ga |Ge |As |Se |Br |Kr |\n'+
                                            '  |---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---|\n'+
                                            '5 |Rb |Sr | Y |Zr |Nb |Mo |Tc |Ru |Rh |Pd |Ag |Cd |In |Sn |Sb |Te | I |Xe |\n'+
                                            '  |---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---|\n'+
                                            '6 |Cs |Ba |LAN|Hf |Ta | W |Re |Os |Ir |Pt |Au |Hg |Tl |Pb |Bi |Po |At |Rn |\n'+
                                            '  |---+---+---+--------------------------------------------------------------------|\n'+
                                            '7 |Fr |Ra |ACT|\n'+
                                            '  -------------\n'+
                                            '              -------------------------------------------------------------\n'+
                                            '   Lanthanide |La |Ce |Pr |Nd |Pm |Sm |Eu |Gd |Tb |Dy |Ho |Er |Tm |Yb |Lu |\n'+
                                            '              |---+---+---+---+---+---+---+---+---+---+---+---+---+---+---|\n'+
                                            '   Actinide   |Ac |Th |Pa | U |Np |Pu |Am |Cm |Bk |Cf |Es |Fm |Md |No |Lw |\n'+
                                            '              -------------------------------------------------------------\n', bg = 'cyan', font = ('Palatino', 20))
p_open.pack()

############################################################################################################################
#Third Frame
frame3 = Frame(root, bg = 'dark grey')
frame_title3 = Label(frame3, text = 'This is your English guide', font = ('Times', 20))
frame_title3.pack(fill = 'x')

in_frame3 = Frame(frame3, bg='black')
in_frame3.pack(side = LEFT, anchor = 'nw', pady = 20)

bck_btn3 = Button(in_frame3, text='Table Of Contents', font = ('Comic Sans MS', 24), command= lambda : showFrame(frame6))
bck_btn3.grid(row = 2, column = 0, padx = 13, pady = 20)

Advanced_btn_screen = Button(in_frame3, text='Advanced Writing', font = ('Comic Sans MS', 15),command = lambda : showFrame(engFrame))
Advanced_btn_screen.grid(row = 3, column = 0, padx = 12, pady = 14)
############################################################################################################################

imgos11 = os_detect('C:/ProgramData/AStudyPal/venv/Images/history.png', "/usr/lib/astudypal/venv/Images/history.png", NONE)
english_img = Image.open(imgos11)
english_img.thumbnail((350,350))
english_img = ImageTk.PhotoImage(english_img)
english_lbl = Label(frame3)
english_lbl.configure(image = english_img)
english_lbl.pack()

############################################################################################################################
engFrame = Frame(root, bg = bg_color)
############################################################################################################################
eng_title = Label(engFrame, text = 'Advanced Writing', bg = bg_color, font = ('Palatino', 70))
eng_title.pack(padx = 60, anchor = 'nw')

eng_show_data_frame = Frame(engFrame, bg = bg_color)
eng_show_data_frame.pack(side = LEFT, fill = BOTH)

edit_frame = Frame(engFrame, bg = bg_color)
edit_frame.pack(side = RIGHT, fill = BOTH)

bck_btn4 = Button(edit_frame, text = 'Main Menu', width = 9, font = ('Garamound', 16), command = lambda : showFrame(frame3))
bck_btn4.pack()

Label(edit_frame, text = '', bg = bg_color).pack(pady = 15)

letter_count = Button(edit_frame, text = 'Letter Count & Percentage', width = 20, height = 1, font = ('lato', 20), command = ENG_file_l)
letter_count.pack()

mla_checker_btn = Button(edit_frame, text = 'MLA Grammar', width = 20, height = 1, font = ('lato', 20), command = ENG_mla_c)
mla_checker_btn.pack(pady = 20)

Label(edit_frame, text = '', bg = bg_color).pack()

webster_dict = Label(edit_frame, text = 'Webster\'s Dictionary', font = ('Palatino', 40), bg = bg_color, fg = 'blue')
webster_dict.pack(pady = 10, padx = 15)

dictionary_redirect = Button(edit_frame, text = 'Dictionary', font = ('lato', 30), width = 9, command = lambda : showFrame(dictionaryFrame))
dictionary_redirect.pack(pady = 30)

eng_file_input = StringVar()

file_finder = Entry(engFrame, textvariable = eng_file_input, font = ('lato', 15), width = 55)
file_finder.bind("<Control_L>"+"<d>", on_delete_ENG1)
file_finder.pack(pady = 5)
file_finder.insert(END, "file directory(folder)/filename.txt, .md")

finder_btn = Button(engFrame, text = 'Find File', font = ('lato', 15), bg = 'blue', command = ENG_file_n)
finder_btn.pack()

text_box = Text(engFrame, width = 50, height = 28, font = ('Times', 20))
text_box.pack(pady = 20)

############################################################################################################################
dictionaryFrame = Frame(root, bg = bg_color)
############################################################################################################################
dictionary_title = Label(dictionaryFrame, text = 'Webster\'s Dictionary', font = ('Palatino', 75), bg = bg_color)
dictionary_title.pack(pady = 25)

user_search = StringVar()

search_bar = Entry(dictionaryFrame, textvariable = user_search, width = 40, font = ('Comic Sans MS', 30))
search_bar.bind("<Control_L>"+"<d>", on_delete_ENG2)
search_bar.pack(pady = 30, padx = 14)

search_bar.insert(0, 'Search Mariam Websters Dictionary')

search_btn = Button(dictionaryFrame, text = 'SEARCH', height = 1, font = ('lato', 35), command = ENG_websters_dictionary)
search_btn.pack(pady = 29)

bck_btn5 = Button(dictionaryFrame, text = 'Back', width = 9, font = ('Garamound', 25), command = lambda : showFrame(engFrame))
bck_btn5.pack()

############################################################################################################################

#Fourth Frame
frame4 = Frame(root, bg = 'dark grey')
frame_title4 = Label(frame4, text = 'This is your History guide', font = ('Times', 20))
frame_title4.pack(fill = 'x')

in_frame4 = Frame(frame4, bg='black')
in_frame4.pack(side = LEFT, anchor = 'nw', pady = 10)

bck_btn4 = Button(in_frame4, text='Table Of Contents', font = ('Comic Sans MS', 24), command= lambda : showFrame(frame6))
bck_btn4.grid(row = 2, column = 0, padx = 13, pady = 20)

wiki_btn = Button(in_frame4, text = "Search Wikipedia", font = ('Comic Sans MS', 24), command = lambda : showFrame(wikiFrame))
wiki_btn.grid(row = 4, column = 0, pady = 15)
############################################################################################################################

imgos12 = os_detect('C:/ProgramData/AStudyPal/venv/Images/history.png', "/usr/lib/astudypal/venv/Images/history.png", NONE)
history_img = Image.open(imgos12)
history_img.thumbnail((350,350))
history_img = ImageTk.PhotoImage(history_img)
history_lbl = Label(frame4)
history_lbl.configure(image = history_img)
history_lbl.pack()
############################################################################################################################
wikiFrame = Frame(root, bg = bg_color)
############################################################################################################################
main_wiki_frame = Frame(wikiFrame)
main_wiki_frame.pack(fill = BOTH, expand = 10)

my_canvas_wiki = Canvas(main_wiki_frame, bg = bg_color)
my_canvas_wiki.pack(side = LEFT, fill = BOTH, expand = 10)

my_scrollbar_wiki = ttk.Scrollbar(main_wiki_frame, orient=VERTICAL, command=my_canvas_wiki.yview)
my_scrollbar_wiki.pack(side=RIGHT, fill=Y)

my_canvas_wiki.configure(yscrollcommand=my_scrollbar_wiki.set)
my_canvas_wiki.bind('<Configure>', lambda e: my_canvas_wiki.configure(scrollregion=my_canvas_wiki.bbox("all")))

second_frame_wiki = Frame(my_canvas_wiki, bg = bg_color)

my_canvas_wiki.create_window((0, 0), window=second_frame_wiki, anchor="nw")
############################################################################################################################
wiki_title = Label(second_frame_wiki, text = 'Search Wikipedia', font = ('Palatino', 65), bg = bg_color)
wiki_title.pack()

historyInput = StringVar()

search_bar2 = Entry(second_frame_wiki, textvariable = historyInput, width = 45, font = ('lato', 27), borderwidth = 4)
search_bar2.bind("<Control_L>"+"<d>", on_delete_HTY)
search_bar2.pack(pady = 20)

search_btn2 = Button(second_frame_wiki, text = 'Search', width = 17, font = ('lato', 13), height = 1, command = wiki_pedia_search)
search_btn2.pack(pady = 35)

bck_btn7 = Button(second_frame_wiki, text = 'Main Menu', font = ('lato', 25), command = lambda : showFrame(frame4))
bck_btn7.pack()

Label(second_frame_wiki, text = '                                                                                               ', font = ('Times', 40), bg = bg_color).pack()

############################################################################################################################
#Fifth Frame
frame5 = Frame(root, bg = 'dark grey')
frame_title5 = Label(frame5, text = 'This is your Foreign Languages guide', font = ('Times', 20))
frame_title5.pack(fill = 'x')

in_frame5 = Frame(frame5, bg='black')
in_frame5.pack(side = LEFT, anchor = 'nw', pady = 20)

bck_btn5 = Button(in_frame5, text='Table Of Contents', font = ('Comic Sans MS', 19), command= lambda : showFrame(frame6))
bck_btn5.grid(row = 2, column = 0, padx = 13, pady = 15)

span_btn_screen5 = Button(in_frame5, text='Translator', font = ('Comic Sans MS', 15), width = 12, height = 1, command = lambda : showFrame(translatorFrame))
span_btn_screen5.grid(row = 3, column = 0, padx = 12, pady = 15)
############################################################################################################################

imgos13 = os_detect('C:/ProgramData/AStudyPal/venv/Images/foreign-language.png', "/usr/lib/astudypal/venv/Images/foreign-language.png", NONE)
foreign_img = Image.open(imgos13)
foreign_img.thumbnail((350,350))
foreign_img = ImageTk.PhotoImage(foreign_img)
foreign_lbl = Label(frame5)
foreign_lbl.configure(image = foreign_img)
foreign_lbl.pack()
############################################################################################################################
translatorFrame = Frame(root, bg = bg_color)
############################################################################################################################
main_translator_Frame = Frame(translatorFrame)
main_translator_Frame.pack(fill = BOTH, expand = 10)

my_translator_canvas = Canvas(main_translator_Frame, bg = bg_color)
my_translator_canvas.pack(side = LEFT, fill = BOTH, expand = 10)

my_scrollbar_translator = ttk.Scrollbar(main_translator_Frame, orient=VERTICAL, command=my_translator_canvas.yview)
my_scrollbar_translator.pack(side=RIGHT, fill=Y)

my_translator_canvas.configure(yscrollcommand=my_scrollbar_translator.set)
my_translator_canvas.bind('<Configure>', lambda e: my_translator_canvas.configure(scrollregion=my_translator_canvas.bbox("all")))

second_frame_translator = Frame(my_translator_canvas, bg = bg_color)

my_translator_canvas.create_window((0, 0), window=second_frame_translator, anchor="nw")
############################################################################################################################
translator_title = Label(second_frame_translator, text = 'Translator', font = ('Palatino', 65), bg = bg_color)
translator_title.grid(row = 0, column = 1, padx = 50)

Label(second_frame_translator, text = 'Welcome to the Translator', bg = bg_color, font = ('lato', 20)).grid(row = 1, column = 1)

translator_entity = StringVar()

translator_entry = Entry(second_frame_translator, font = ('lato', 30), width = 40, borderwidth = 4)
translator_entry.bind("<Control_L>"+"<d>", on_delete_SPN)
translator_entry.grid(row = 2, column = 1, pady = 30)

finder_btn_2 = Button(second_frame_translator, text = 'Google Translate', font = ('lato', 20), command = lambda : google_translate(translator_entry))
finder_btn_2.grid(row = 3, column = 1)

finder_btn_3 = Button(second_frame_translator, text = 'Wordreference.com', font = ('lato', 20), command = lambda : word_translate(translator_entry))
finder_btn_3.grid(row = 4, column = 1, pady = 25)

bck_btn8 = Button(second_frame_translator, text = 'Main Menu', font = ('lato', 20), width = 12, height = 1, command = lambda : showFrame(frame5))
bck_btn8.grid(row = 5, column = 1, pady = 10)

Label(second_frame_translator, text = '                                                        ', bg = bg_color).grid(row = 6, column = 0, pady = 20)

############################################################################################################################
#Sixth Frame //No Backend needed
frame6 = Frame(root, bg = f'{bg_color}')
frame_title6 = Label(frame6, text = 'Table Of Contents', font = ('Times', 20))
frame_title6.pack(side = TOP, fill = 'x')

#Panel #1 Container which holds the menu bar
panel = PanedWindow(frame6, bd = 6, orient = HORIZONTAL, relief = 'raised')
panel.pack(fill = X, expand = 0)

############################################################################################################################

#Math Image #1
'''Correction NEEDED'''
imgos14 = os_detect('C:/ProgramData/AStudyPal/venv/Images/mathMenu.png', "/usr/lib/astudypal/venv/Images/mathMenu.png", NONE)
img = Image.open(imgos14)
img.thumbnail((350,350))
img = ImageTk.PhotoImage(img)
lbl_btn = Label(panel, text = 'image')
lbl_btn.configure(image=img)
lbl_btn.image = img
panel.add(lbl_btn)

#Math's frame plaeholder
Math_btn = Button(panel, text='Math Class', command = lambda : showFrame(frame1))
panel.add(Math_btn)

#Science Image #2
'''Correction NEEDED'''
imgos15 = os_detect('C:/ProgramData/AStudyPal/venv/Images/scienceMenu.png', "/usr/lib/astudypal/venv/Images/scienceMenu.png", NONE)
img = Image.open(imgos15)
img.thumbnail((350,350))
img = ImageTk.PhotoImage(img)
lbl_btn = Label(panel, text = 'image2')
lbl_btn.configure(image=img)
lbl_btn.image = img
panel.add(lbl_btn)

#Science's Placeholder
Science_btn = Button(panel, text='Science Class', command = lambda : showFrame(frame2))
panel.add(Science_btn)

#English Image #3
'''Correction NEEDED'''
imgos16 = os_detect('C:/ProgramData/AStudyPal/venv/Images/englishMenu.png', "/usr/lib/astudypal/venv/Images/englishMenu.png", NONE)
img = Image.open(imgos16)
img.thumbnail((350,350))
img = ImageTk.PhotoImage(img)
lbl_btn = Label(panel, text = 'image3')
lbl_btn.configure(image=img)
lbl_btn.image = img
panel.add(lbl_btn)

#English's frame Placeholder
English_btn = Button(panel, text='English Class', command = lambda : showFrame(frame3))
panel.add(English_btn)

#History Image #4
'''Correction NEEDED'''
imgos17 = os_detect('C:/ProgramData/AStudyPal/venv/Images/historyMenu.png', "/usr/lib/astudypal/venv/Images/historyMenu.png", NONE)
img = Image.open(imgos17)
img.thumbnail((350,350))
img = ImageTk.PhotoImage(img)
lbl_btn = Label(panel, text = 'image3')
lbl_btn.configure(image=img)
lbl_btn.image = img
panel.add(lbl_btn)

#Histories frame Placeholder
History_btn = Button(panel, text='History Class', command = lambda : showFrame(frame4))
panel.add(History_btn)

#Foreign Languages Class Image #5
'''Correction NEEDED'''
imgos18 = os_detect('C:/ProgramData/AStudyPal/venv/Images/foreign-languageMenu.png', "/usr/lib/astudypal/venv/Images/foreign-languageMenu.png", NONE)
img = Image.open(imgos18)
img.thumbnail((350,350))
img = ImageTk.PhotoImage(img)
lbl_btn = Label(panel, text = 'Hello')
lbl_btn.configure(image=img)
lbl_btn.image = img
panel.add(lbl_btn)

#Foreign Languages Class's frame PlaceHolder
Lang_btn = Button(panel, text='Foreign Languages Class', command = lambda : showFrame(frame5))
panel.add(Lang_btn)

##########################################################################################################################################
#Panel #2
panel2 = PanedWindow(panel, orient = HORIZONTAL, relief = 'flat')
panel.add(panel2)

#Student Resources Image #6
'''Correction NEEDED'''
imgos19 = os_detect('C:/ProgramData/AStudyPal/venv/Images/student-resourcesMenu.png', "/usr/lib/astudypal/venv/Images/student-resourcesMenu.png", NONE)
img = Image.open(imgos19)
img.thumbnail((350,350))
img = ImageTk.PhotoImage(img)
lbl_btn = Label(panel2, text = 'Hello')
lbl_btn.configure(image=img)
lbl_btn.image = img
panel2.add(lbl_btn)

#Student Resources' frame Placeholder
Student_rec = Button(panel2, text='Student Resources Department', command = sturec)
panel2.add(Student_rec)
#######################################################################################################
content_frame = Frame(frame6, bg = bg_color)
content_frame.pack()

imgos20 = os_detect(r'C:/ProgramData/AStudyPal/venv/logo_img.png', r"/usr/lib/astudypal/venv/logo_img.png", NONE)
logo = Image.open(imgos20)
logo = ImageTk.PhotoImage(logo)
lbl_content = Label(content_frame, bg = bg_color)
lbl_content.config(image = logo)
lbl_content.grid(row = 0, column = 0, pady = 10)

Label(content_frame, text = "Search Classes and Class Subjects", font = ("Times", 23), bg = bg_color).grid(row = 1, column = 0)
entry = Entry(content_frame, width = 21, font = ("system", 19), bd = 4)
entry.grid(row = 2, column = 0)

classes = [
    "Math Class",
    "Science Class",
    "English Class",
    "History Class",
    "Foreign Languages Class",
    "Student Resources Department",
    "Geometry",
    "Algebra",
    "Trigonometry",
    "Exponents^2",
    "Chemistry",
    "Advanced Writing",
    "Search Wikipedia",
    "Spanish",
    "Books & Answer Keys",
    "Feedback"
]

Label(content_frame, text = "", bg = bg_color).grid(row = 4, column = 0, pady = 20)

web_visit = Button(content_frame, text = "Visit the astudypal.com website", font = ("Paramound", 15), command = lambda : Open_web("https://wized.club"))
web_visit.grid(row = 5, column = 0)

Label(content_frame, text = "To learn more", font = ("Times", 10), bg = bg_color).grid(row = 6, column = 0)
#######################################################################################################
teacherFrame = Frame(root, bg = 'blue')
title_label = Label(teacherFrame, text = "Welcome to Teacher Add")
title_label.pack(pady = 30)
teacher_info = Label(teacherFrame, text = "This is where teachers can add their knowledge to each class")
teacher_info.pack()

classTeacherFrame = Frame(teacherFrame, bg = "blue")
classTeacherFrame.pack(pady = 20)
teacherPanel = PanedWindow(classTeacherFrame, orient = HORIZONTAL)
teacherPanel.pack()

# math_button = Button(teacherPanel, text = "Math Class", font = ("Palatino", 50))
# teacherPanel.add(math_button)

Label(classTeacherFrame, text = "Coming Soon", font = ("Fixedsys", 150), bg = "blue", fg = "red").pack(pady = 20)
################################################################
main_menu = Menu(root)
root.config(menu = main_menu)
main_menu_btn = Menu(main_menu)
main_menu.add_cascade(label = 'Table of Contents', menu = main_menu_btn)
main_menu_btn.add_command(label = 'Table Of Contents', command = lambda : showFrame(frame6))
main_menu_btn.add_command(label = 'Music Center', command = lambda : showFrame(musicFrame))
#######################################################################################################
musicFrame = Frame(root, bg = "tan")

playlistFrame = LabelFrame(musicFrame, text = "Music Import", font = ("Times", 35), bg = "tan")
scroll_frame = Frame(playlistFrame)
playlist_scrollbar = Scrollbar(scroll_frame, orient = VERTICAL)
playlist_box = Listbox(scroll_frame, yscrollcommand = playlist_scrollbar.set, bg = "black", fg = "tan", width = 120, height = 22, font = ("system", 10), selectbackground = 'white', selectforeground = 'red')
playlist_scrollbar.config(command = playlist_box.yview)
playlist_scrollbar.pack(side = RIGHT, fill = Y)
scroll_frame.grid(row = 0, column = 1)
playlist_box.pack()
playlistFrame.pack(side = LEFT, anchor = "n")

musicControls = LabelFrame(playlistFrame, text = "Music Controls", font = ("Times", 25), bg = "white", fg = "blue")
musicControls.grid(row = 1, column = 1)

imgosSTOP = os_detect('C:/ProgramData/AStudyPal/venv/Images/stop_btn.png', "/usr/lib/astudypal/venv/Images/stop_btn.png", NONE)
imgosPLAY = os_detect('C:/ProgramData/AStudyPal/venv/Images/play_btn.png', "/usr/lib/astudypal/venv/Images/play_btn.png", NONE)
imgosPAUSE = os_detect('C:/ProgramData/AStudyPal/venv/Images/pause_btn.png', "/usr/lib/astudypal/venv/Images/pause_btn.png", NONE)
imgosFOR = os_detect('C:/ProgramData/AStudyPal/venv/Images/forward_btn.png', "/usr/lib/astudypal/venv/Images/forward_btn.png", NONE)
imgosBACK = os_detect('C:/ProgramData/AStudyPal/venv/Images/backward_btn.png', "/usr/lib/astudypal/venv/Images/backward_btn.png", NONE)
stop_img = PhotoImage(file = imgosSTOP)
play_img = PhotoImage(file = imgosPLAY)
pause_img = PhotoImage(file = imgosPAUSE)
forward_img = PhotoImage(file = imgosFOR)
backward_img = PhotoImage(file = imgosBACK)
stop_btn = Button(musicControls, image = stop_img, bd = 0, bg = "white", command = stop)
play_btn = Button(musicControls, image = play_img, bd = 0, bg = "white", command = play)
pause_btn = Button(musicControls, image = pause_img, bd = 0, bg = "white", command = lambda : pause(paused))
forward_btn = Button(musicControls, image = forward_img, bd = 0, bg = "white", command = next_song)
backward_btn = Button(musicControls, image = backward_img, bd = 0, bg = "white", command = prev)
backward_btn.grid(row = 0, column = 0, padx = 40)
pause_btn.grid(row = 0, column = 1, padx = 40)
play_btn.grid(row = 0, column = 2, padx = 40)
stop_btn.grid(row = 0, column = 3, padx = 40)
forward_btn.grid(row = 0, column = 4, padx = 40)

volumeFrame = LabelFrame(musicFrame, text = "Volume", font = ("fixedsys", 17), bg = "tan")
volumeFrame.pack()
volume_bar = ttk.Scale(volumeFrame, orient = VERTICAL, from_ = 1, to = 0, length = 310, command = volume)
volume_bar.pack(anchor = "n")
volume_label = Label(volumeFrame, text = "0", font = ("system", 13), fg = "blue")
volume_label.pack(pady = 12)

elapsed_bar = ttk.Scale(playlistFrame, from_ = 0, to = 100, orient = HORIZONTAL, value = 0, command = slide, length = 650)
elapsed_bar.grid(row = 2, column = 1, pady = 12)
#########################################################
adding_options = [
    "Add song",
    "Add multiple songs"
]

deleting_options = [
    "Delete selected",
    "Delete All"
]

playlist_options = [
    "Save Playlist",
    "Load Playlist"
]
#########################################################
added_string = StringVar()
added_string.set(adding_options[0])

add_songs = OptionMenu(musicFrame, added_string, *adding_options, command = add)
add_songs.pack(pady = 20)

deleted_string = StringVar()
deleted_string.set(deleting_options[0])

delete_songs = OptionMenu(musicFrame, deleted_string, *deleting_options, command = delete_song_menu)
delete_songs.pack(pady = 15)

playlist_string = StringVar()
playlist_string.set(playlist_options[0])

playlist_songs = OptionMenu(musicFrame, playlist_string, *playlist_options, command = playlist_save)
playlist_songs.pack(pady = 15)

status_frame = Frame(playlistFrame, bg = "tan")
status_frame.grid(row = 3, column = 1)

status_bar1 = Label(status_frame, text = "0:00", font = ("system", 16), fg = "red", bg = "tan")
status_bar1.grid(row = 3, column = 0)

Label(status_frame, text = "", bg = "tan").grid(row = 3, column = 1, padx = 185)

status_bar2 = Label(status_frame, text = "0:00", font = ("system", 16), fg = "red", bg = "tan")
status_bar2.grid(row = 3, column = 2)
###############################################################
#Putting the frames onto the GUI

for frame in (musicFrame, teacherFrame, translatorFrame, wikiFrame, dictionaryFrame, engFrame, perioFrame, chemFrame, exponentFrame, trig_frame, algFrame, geoFrame, frame1, frame2, frame3, frame4, frame5, frame6):
    frame.grid(row = 0, column = 0, sticky = 'nsew')

#DO NOT TOUCH
showFrame(frame)
entry.bind("<KeyPress>", check)
entry.bind("<Return>", OnCheckEnter)
entry.bind("<Control_L>" + "<d>", OndeleteEntry)
root.mainloop()