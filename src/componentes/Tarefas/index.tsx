import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as estilo from './styles'
import {
  remover,
  editar,
  alteraStatus
} from '../../store/reducers/reducerTarefa'
import TarefaClass from '../../models/TarefasExecutadas'
import { Botao, BotaoSalvar } from '../../styles'
import * as enums from '../../utils/enums'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescicao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescicao(descricaoOriginal)
    }
  }, [descricaoOriginal]) //fazendo a descrição inicial do card receber a descrição original que foi editada pelo usuário

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescicao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(alteraStatus({ id, finalizado: evento.target.checked }))
  }

  return (
    <estilo.Card>
      <label>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDO}
          onChange={alteraStatusTarefa}
        />
        <estilo.Titulo>
          {estaEditando ? <em>Editando: </em> : ''}
          {titulo}{' '}
        </estilo.Titulo>
      </label>
      <estilo.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </estilo.Tag>
      <estilo.Tag parametro="status" status={status}>
        {status}
      </estilo.Tag>
      <estilo.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescicao(evento.target.value)}
      />
      <estilo.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(editar({ descricao, prioridade, status, titulo, id }))
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <estilo.BotaoCancelar onClick={cancelarEdicao}>
              Cancelar
            </estilo.BotaoCancelar>
            {/* Aqui está falando que ao clicar no botao "cancelar" o estado
            passará a ser falso, logo os botões que serão mostrados serão os de baixo */}
          </>
        ) : (
          <>
            {/* aqui está falando que ao clica no botão editar, o estado irá passar
          para o estado verdadeiro, logo quando clicar, os botões mostrados serão
          os de cima (estado verdadeiro) */}
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <estilo.BotaoCancelar onClick={() => dispatch(remover(id))}>
              Excluir
            </estilo.BotaoCancelar>
          </>
        )}
      </estilo.BarraAcoes>
    </estilo.Card>
  )
}

export default Tarefa
