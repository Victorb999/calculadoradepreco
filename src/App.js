import React, { Component } from 'react'

import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";


export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      resultado: "",
      unidade:"",
      quantidade2: "",
      deuerro: false,
      erro: {}
    }
    this.handleForm = this.handleForm.bind(this)
    this.validaform = this.validaform.bind(this)
  }
  validaform(){
    let valido = true
    let erros = {}

    if(!this.preco.value || this.preco.value.length <1){
      erros.preco = "Digite um preço né!?"
      valido = false
    }
    if(!this.quantidade1.value || this.quantidade1.value.length < 1){
      erros.quantidade1 = "Digite uma quantidade né, OXI!?"
      valido = false
    }
    if(!this.quantidade2.value || this.quantidade2.value.length < 1){
      erros.quantidade2 = "Digite uma quantidade né!?"
      valido = false
    }    

    this.setState({
      deuerro: !valido,
      erros: erros,
      resultado:""
    })

    return valido
  }

  handleForm(e){
    e.preventDefault()    

    const v = {
      preco: this.preco.value.replace(",","."),
      quantidade1:this.quantidade1.value,
      quantidade2: this.quantidade2.value      
    }
    //realiza o calculo
    try{
      if(this.validaform()){
        const resultado =(v.preco * v.quantidade2) / v.quantidade1
        this.setState({
          resultado:resultado.toFixed(2),
          unidade:this.unidade.value,
          quantidade2: v.quantidade2
        })

        //limpa form
        this.preco.value = ""
        this.quantidade1.value = ""
        this.quantidade2.value   = ""
      }
    }
    catch{
      this.setState({
        deuerro:true,
        erro:"Ops,ocorreu um erro no cálculo."
      })
    }

  } 
  render(){
  return (
    <div className="App">
      <header className="App-header">
        
      <div
      className="page-header"
     
    >        
      <Container >
        <Row>
          <Col className="ml-auto mr-auto" lg="8">
            <Card className="card-register ml-auto mr-auto" style={{"marginTop":"50px"}}>
              <h3 className="title mx-auto" style={{"margin":"5px"}}>Calcule o preço por unidade</h3>

                 { //se deu erro ao enviar
                  this.state.deuerro &&
                  <span className="btn mr-1 btn btn-danger">
                    {this.state.erros.preco && 
                      <p>{this.state.erros.preco}</p>                       
                    }
                    {this.state.erros.quantidade1 && 
                      <p>{this.state.erros.quantidade1}</p> 
                    }
                    {this.state.erros.quantidade2 && 
                      <p>{this.state.erros.quantidade2}</p>  
                    }                   
                  </span>
                }

                  <Form className="contact-form" style={{"marginTop":"0px"}} onSubmit={this.handleForm}>
                  <span className="desc">Digite as quantidades sempre na mesma unidade de medida</span>
                  <Row>
                      <Col md="6">
                          <label>Digite o preço do produto</label>
                          <InputGroup>
                          <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                              <i class="fa fa-money"></i>
                              </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Preço" type="text" id="preco" innerRef={ref=> this.preco = ref}/>
                          </InputGroup>
                      </Col>
                      <Col md="6">
                          <label>Digite a quantidade da embalagem</label>
                          <InputGroup>
                          <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                              <i className="fa fa-archive"/>
                              </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Quantidade" type="text" innerRef={ref=> this.quantidade1 = ref}/>
                          </InputGroup>
                      </Col>
                  </Row>
                  <Row>
                      <Col md="6">
                          <label>Digite quantidade da receita</label>
                          <InputGroup>
                          <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                              <i className="fa fa-shopping-basket" />
                              </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Quantidade" type="text" id="quantidade2" innerRef={ref=> this.quantidade2 = ref}/>
                          </InputGroup>
                      </Col>
                      <Col md="6">
                          <label>Escolha a unidade usada</label>
                          <InputGroup>                          
                          <Input type="select" required innerRef={ref=> this.unidade = ref}>
                            <option>miligramas</option>
                            <option>quilogramas</option>
                            <option>mililitros</option>
                            <option>litros</option>
                            <option>unidades</option>
                          </Input>
                          </InputGroup>
                      </Col>
                  </Row>
                  
                                    
                  {this.state.resultado &&
                    <h1 className="tex-center">Cada {this.state.quantidade2} {this.state.unidade} custa  R$ {this.state.resultado}</h1>
                  } 
                  

                  <Row>
                      <Col className="ml-auto mr-auto" md="3">
                          <Button className="btn-fill" color="primary" size="lg">
                            Calcular
                          </Button>
                      </Col>
                  </Row>
              </Form>         
              
              
              
            </Card>
          </Col>
        </Row>
      </Container>

        <div className="footer text-center">
          <h6 className="rodape">
            © {new Date().getFullYear()}, feito com{" "}
            <i className="fa fa-heart heart" /> por Victor Araújo
          </h6>
        </div>

      </div>
        
      </header>
    </div>
  )
  }
}

