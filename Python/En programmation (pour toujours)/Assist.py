from tkinter import *
from tkinter.messagebox import *
import webbrowser
import urllib
import time

def rech(event):
    webbrowser.open_new(sit)

def enter(event):
    if(Ent_mdp.get()) == 'lol' and (Ent_m.get()) == 'Adrien':
        B = Tk()
        B.title("Entrez votre recherche.")

        fram = Frame(B, width=400, height=200, bg="grey")
        fram.pack()

        sit1 = Label(fram, text="Entrez votre recherche.")
        sit1.pack()

        site = Entry(fram, textvariable=sit)
        site.pack()

        A.bind("<Up>", rech)
        
        A.destroy()
        B.mainloop()
    else:
        showwarning('Aïe','Mot de passe incorrect.\nVeuillez recommencer...')
sit = 0    
Ent = 0
A = Tk()
A.title("Connexion requise!")

txt0 = Label(A, text="Entrer votre nom d'utilisateur:")
txt0.pack()

Ent_m = Entry(A, textvariable=Entry)
Ent_m.pack()

txt = Label(A, text="Entrer votre mot de passe:")
txt.pack()

Ent_mdp = Entry(A, textvariable=Ent, show='*')
Ent_mdp.pack()

A.bind("<Return>", enter)

A.mainloop()
#A.destroy()
