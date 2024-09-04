import {CirclePlus, CircleX} from "lucide-react";
import {Table} from "./table/table.tsx";
import {TableHeader} from "./table/table-header.tsx";
import {TableCell} from "./table/table-cell.tsx";
import {TableRow} from "./table/table-row.tsx";
import {useEffect, useState} from "react";
import {IconButton} from "./icon-button.tsx";
import {loadRegistros} from "../storage/loadRegistros.ts";

export function List() {

    // Estado para armazenar os registros (inicialmente, com os dados de `dataRegistro.ts`)
    const [registros, setRegistros] = useState(loadRegistros);

    // Estados para capturar os valores dos campos de entrada
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');

    // Função para adicionar um novo registro
    function addRegistro() {
        if (newName.trim() !== '' && newPhone.trim() !== '') {
            // Adiciona o novo registro ao estado de registros
            const updatedRegistros = [...registros, { name: newName, phone: newPhone }];

            // Atualiza o estado e salva no localStorage
            setRegistros(updatedRegistros);
            localStorage.setItem('registros', JSON.stringify(updatedRegistros));

            setNewName('');
            setNewPhone('');

        }
    }

    // Função para excluir um registro
    function deleteRegistro(index: number)  {
        const updatedRegistros = registros?.filter((_, i) => i !== index);
        setRegistros(updatedRegistros);
        localStorage.setItem('registros', JSON.stringify(updatedRegistros));
    }

    // useEffect para garantir que os dados sejam salvos no localStorage sempre que os registros forem atualizados
    useEffect(() => {
        localStorage.setItem('registros', JSON.stringify(registros));
    }, [registros]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Adicionar Registro: </h1>
                <div className="flex gap-3 items-center">
                    <input
                        type="text"
                        placeholder="Digite o nome"
                        className="bg-transparent flex-1 outline-none  p-0 text-sm "
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="bg-transparent flex-1 outline-none  p-0 text-sm "
                        placeholder="Digite o telefone"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                    />
                    <button onClick={addRegistro} title="Incluir">
                        <CirclePlus className="siae-4 text-emerald-300"/>
                    </button>
                </div>
            </div>

            <Table>
                <thead>
                <tr className="border-b border-white/10">

                    <TableHeader>Nome</TableHeader>
                    <TableHeader>Telefone</TableHeader>

                    <TableHeader style={{width: 64}}> </TableHeader>
                </tr>
                </thead>

                <tbody>
                {registros?.map((registro, index) => {
                    return (
                        <TableRow key={index}>

                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-white">{registro.name}</span>

                                </div>
                            </TableCell>

                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span>{registro.phone}</span>
                                </div>
                            </TableCell>

                            <TableCell>
                                <IconButton transparent={false} title="Excluir" onClick={() => deleteRegistro(index)}>
                                    <CircleX className="size-4"/>
                                </IconButton>
                            </TableCell>

                        </TableRow>
                    )
                })}

                </tbody>

            </Table>

        </div>

    )
}