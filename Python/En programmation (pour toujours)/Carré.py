from tkinter import *
A = Tk()
A.title = "Carré"
ecran = Canvas(A, width=600, height=400, bg="grey")
ecran.pack(expand=True)
upA = 0
x0, y0 = 300, 200
dx = 15
dy = 15
angle = 0
event = 0
carre = ecran.create_rectangle(x0, y0, x0+30, y0+30, width=3, fill="green")

def up(event):
    global x0, y0, dx, dy
    y0 = y0 - dy
    ecran.coords(carre, x0, y0, x0+30, y0+30)
    angle = 1

def down(event):
    global x0, y0, dx, dy
    y0 = y0 + dy
    ecran.coords(carre, x0, y0, x0+30, y0+30)
    angle = 3

def right(event):
    global x0, y0, dx, dy
    x0 = x0 + dy
    ecran.coords(carre, x0, y0, x0+30, y0+30)
    angle = 2

def left(event):
    global x0, y0, dx, dy
    x0 = x0 - dx
    ecran.coords(carre, x0, y0, x0+30, y0+30)
    angle = 4

def UR(event):
    global x0, y0, dx, dy
    x0 = x0 + dx
    y0 = y0 - dy
    ecran.coords(carre, x0, y0, x0+30, y0+30)

def DR(event):
    global x0, y0, dx, dy
    x0 = x0 + dx
    y0 = y0 + dy
    ecran.coords(carre, x0, y0, x0+30, y0+30)

def UL(event):
    global x0, y0, dx, dy
    x0 = x0 - dx
    y0 = y0 - dy
    ecran.coords(carre, x0, y0, x0+30, y0+30)

def DL(event):
    global x0, y0, dx, dy
    x0 = x0 - dx
    y0 = y0 + dy
    ecran.coords(carre, x0, y0, x0+30, y0+30)

def S(event):
    red = ecran.create_rectangle(x0, y0, x0+30, y0+30, width=3, fill="red")
    

boutton_quitter = Button(A, text="Quitter", fg="red", command=A.quit)
boutton_quitter.pack(side="bottom")

A.bind('<Space>', S)
A.bind('<Up>', up)
A.bind('<Down>', down)
A.bind('<Right>', right)
A.bind('<Left>', left)
A.bind('<Up-Right>', UR)
A.bind('<Down-Right>', DR)
A.bind('<Up-Left>', UL)
A.bind('<Down-Left>', DL)

A.mainloop()
A.destroy()
