from tkinter import *

turn = 0
c1 = c2 = c3 = c4 = c5 = c5 = c6 = c7 = c8 = c9 = 0
stat = {}
stat[0,0] = stat[200,0] = stat[400,0] = stat[0,200] = stat[200,200] = stat[400,200] = stat[0,400] = stat[200,400] = stat[400,400] = 0
x = 0
y = 0

def win():
    if stat[0,0] == stat[200,0] == stat[400,0] == 1:
        Ecr.create_line(x+10, y+100, x+590, y+100, width=14, fill='orange')
        print('Cross won !')
    if stat[0,200] == stat[200,200] == stat[400,200] == 1:
        Ecr.create_line(x+10, y+300, x+590, y+300, width=14, fill='orange')
        print('Cross won !')
    if stat[0,400] == stat[200,400] == stat[400,400] == 1:
        Ecr.create_line(x+10, y+500, x+590, y+500, width=14, fill='orange')
        print('Cross won !')
    if stat[0,0] == stat[0,200] == stat[0,400] == 1:
        Ecr.create_line(x+100, y+10, x+100, y+590, width=14, fill='orange')
        print('Cross won !')
    if stat[200,0] == stat[200,200] == stat[200,400] == 1:
        Ecr.create_line(x+300, y+10, x+300, y+590, width=14, fill='orange')
        print('Cross won !')
    if stat[400,0] == stat[400,200] == stat[400,400] == 1:
        Ecr.create_line(x+500, y+10, x+500, y+590, width=14, fill='orange')
        print('Cross won !')
    if stat[0,0] == stat[200,200] == stat[400,400] == 1:
        Ecr.create_line(x+10, y+10, x+590, y+590, width=14, fill='orange')
        print('Cross won !')
    if stat[400,0] == stat[200,200] == stat[0,400] == 1:
        Ecr.create_line(x+590, y+10, x+10, y+590, width=14, fill='orange')
        print('Cross won !')
    if stat[0,0] == stat[200,0] == stat[400,0] == 2:
        Ecr.create_line(x+10, y+100, x+590, y+100, width=14, fill='orange')
        print('Round won !')
    if stat[0,200] == stat[200,200] == stat[400,200] == 2:
        Ecr.create_line(x+10, y+300, x+590, y+300, width=14, fill='orange')
        print('Round won !')
    if stat[0,400] == stat[200,400] == stat[400,400] == 2:
        Ecr.create_line(x+10, y+500, x+590, y+500, width=14, fill='orange')
        print('Round won !')
    if stat[0,0] == stat[0,200] == stat[0,400] == 2:
        Ecr.create_line(x+100, y+10, x+100, y+590, width=14, fill='orange')
        print('Round won !')
    if stat[200,0] == stat[200,200] == stat[200,400] == 2:
        Ecr.create_line(x+300, y+10, x+300, y+590, width=14, fill='orange')
        print('Round won !')
    if stat[400,0] == stat[400,200] == stat[400,400] == 2:
        Ecr.create_line(x+500, y+10, x+500, y+590, width=14, fill='orange')
        print('Round won !')
    if stat[0,0] == stat[200,200] == stat[400,400] == 2:
        Ecr.create_line(x+10, y+10, x+590, y+590, width=14, fill='orange')
        print('Round won !')
    if stat[400,0] == stat[200,200] == stat[0,400] == 2:
        Ecr.create_line(x+590, y+10, x+10, y+590, width=14, fill='orange')
        print('Round won !')

def clicg(event):
    global turn
    x = event.x -(event.x%200)
    y = event.y -(event.y%200)
    if stat[x,y]==0 and turn==0:
        Ecr.create_line(x+20, y+20, x+180, y+180, width=20, fill='blue')
        Ecr.create_line(x+20, y+180, x+180, y+20, width=20, fill='blue')
        stat[x,y]=1
        turn = 1
        print("It's Round turn.")
    if stat[x, y]==0 and turn==1:
        x = event.x -(event.x%200)
        y = event.y -(event.y%200)
        Ecr.create_oval(x+20, y+20, x+180, y+180, width=20, outline='red')
        stat[x,y]=2
        turn = 0
        print("It's Cross turn.")
    win()
    
A = Tk()
A.title('Morpion')

Ecr = Canvas(A, width=600, height=600, bg='white')
Ecr.pack()

Ecr.create_line(0, 200, 600, 200, fill='black')
Ecr.create_line(0, 400, 600, 400, fill='black')
Ecr.create_line(200, 0, 200, 600, fill='black')
Ecr.create_line(400, 0, 400, 600, fill='black')

A.bind('<Button-1>', clicg)
A.mainloop()
