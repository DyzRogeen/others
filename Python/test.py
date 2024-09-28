from tkinter import *
from tkinter.ttk import *

root = Tk()
root.geometry("300x100")
root.title("Barre de chargement Tkinter")

progress_label = Label(root, text="")
progress_label.pack(pady=20)

for i in range(0, 101, 10):
    progress_label.config(text="Chargement... {}%".format(i))
    progress_label.update()
    progress_label.after(1000)

root.mainloop()

print("Hello")
