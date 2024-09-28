from tkinter import *
A = Tk()
Bg = Canvas(A, width=600, height=600, bg="white")
Bg.pack(side="top")
i = 0
j = 0
state_cell = {}

for x in range(600), 60:
    for y in range(600), 60:
        state_cell[x,y] = 0


while i != 600:
    Bg.create_line(i, 0, i, 600, width=1, fill="black")
    i = i+60
while j != 600:
    Bg.create_line(0, j, 600, j, width=1, fill="black")
    j = j+60

def clic(event):
    x = event.x-(event.x%60)
    y = event.y-(event.y%60)
    if state_cell[x,y] == 0:
        Bg.create_rectangle(x, y, x+60, y+60, fill="red")
        state_cell[x,y] = 0
    if state_cell[x,y] == 0:
        Bg.create_rectangle(x, y, x+60, y+60, fill="white")
        state_cell[x,y] = 0
        


A.bind("<Button-1>", clic)

#BGo = Button(A, text="   Start   ", command=Start)

BQuit = Button(A, text="   Quitter   ", fg="red", command=A.quit)
BQuit.pack(side="right")

A.mainloop()
A.destroy()

