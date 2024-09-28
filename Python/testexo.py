M = [[1,2,3], [4,5,6]]

M2 = []
for i in range(len(M[0])):
    m2 = []
    for m in M:
        m2.append(m[i])
    M2.append(m2)
print(M2)
