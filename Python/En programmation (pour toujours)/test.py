from tkinter import *
import time
sec_left = 15
A = Tk()
while sec_left>0 :
    text = Label(A, text="Bonjour, cliquez sur le bouton")
    text.pack(side="top")

    temps = Label(A, text="Il vous reste {} secondes".format(sec_left), fg="green")
    temps.pack()

    bA = Button(A, text="Quitter", fg="red", command=A.quit)
    bA.pack(side="left")

    bB = Button(A, text="Cliquez ici", fg="green", command=A.quit)
    bB.pack(side="right")
    A.mainloop()
    A.destroy()

    sec_left -= 1
    temps.after(100)
     
    A.mainloop
    A.destroy()


A.destroy()
