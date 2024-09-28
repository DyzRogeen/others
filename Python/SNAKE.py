from tkinter import *
from random import *
import time
A = Tk()
foc = 3
f = 0
p = 0
grow = 0
xs = 13
ys = 13
xe = 16
ye = 13
x = 1
y = 1
d = 3
lenght = 4
z=0
case = {}
for x in range(26):
    for y in range(26):
        case[x,y] = 0
case[13,13] = case[14,13] = case[15,13] = 1
case[11,4] = 6
A.title = "Snake on Python"
fond = Canvas(A, width=600, height=600, bg="grey")
fond.pack()
for f in range(25):
    fond.create_line(f*24, 0, f*24, 600)
    fond.create_line(0, f*24, 600, f*24)

def U(event):
    global d
    if d!=2:
        d = 1
        case[xs,ys] = 2
    
def D(event):
    global d
    if d!=1:
        d = 2
        case[xs,ys] = 3
    
def L(event):
    global d
    if d!=4:
        d = 3
        case[xs,ys] = 4
    
def R(event):
    global d
    if d!=3:
        d = 4
        case[xs,ys] = 5

def m():
    global x,y,xs,ys,d,foc,xe,ye,grow,lenght
    if d==1 and ys!=0:
        ys=ys-1
    if d==2 and ys!=26:
        ys=ys+1
    if d==3 and xs!=0:
        xs=xs-1
    if d==4 and xs!=26:
        xs=xs+1
    if case[xs,ys]==6:
        grow = 1
        lenght = lenght+1
        print("lenght=", lenght)
        w = randint(1,25)
        z = randint(1,25)
        if case[w,z]==0:
            case[w,z] = 6
        else:
            w = randint(1,25)
            z = randint(1,25)
            if case[w,z]==0:
                case[w,z] = 6
    if case[xs,ys]==1 or ys==0 or ys==26 or xs==0 or xs==26:
        print("-----GAME OVER-----")
        A.destroy()
    case[xs,ys] = 1
    

    if grow==0:
        if case[xe,ye]==2:
            foc = 1
        if case[xe,ye]==3:
            foc = 2
        if case[xe,ye]==4:
            foc = 3
        if case[xe,ye]==5:
            foc = 4
        case[xe,ye] = 0

        if foc==1:
            ye = ye-1
        if foc==2:
            ye = ye+1
        if foc==3:
            xe = xe-1
        if foc==4:
            xe = xe+1
    else:
        grow = 0

    for x in range(25):
        for y in range(25):
            if case[x+1,y+1]==1:
                fond.create_rectangle(x*24, y*24, x*24+25, y*24+25, fill="green")
            if case[x+1,y+1]==0:
                fond.create_rectangle(x*24, y*24, x*24+25, y*24+25, fill="grey")
            if case[x+1,y+1]==6:
                fond.create_rectangle(x*24, y*24, x*24+25, y*24+25, fill="red")
    A.after(150, m)

A.bind('<Up>', U)
A.bind('<Down>', D)
A.bind('<Left>', L)
A.bind('<Right>', R)
    
A.after_idle(m)
A.mainloop()
A.destroy()
