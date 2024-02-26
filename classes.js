//classe padrão
class character{
    // Caracteristicas padrão do personagem
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }
    //retorna o valor life 
    get life(){
        return this._life;
    }
    //faz com que life não seja menor que zero
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }
}

//criando a casse de outros personagens
    class knight extends character{
        //essa classe herda as caracteristicas da casse pai
        constructor(name){
            super(name);
            this.life = 100;
            this.attack = 10;
            this.defense = 8;
            this.maxLife = this._life;
        }
    }
    //Essa classe também herda a classe character 
    class sorcerer extends character{
        constructor(name){
            super(name);
            this.life = 80;
            this.attack = 15;
            this.defense = 3;
            this.maxLife = this.life;
        }
    }

    //Criando a classe Littlemonster herdando character
    class LitteMonster extends character{
        constructor(){
            super('Little Monster');//Definindo seu nome manualmente 
            this.life = 40;
            this.attack = 8;
            this.defense = 4;
            this.maxLife = this.life;
        }
    }
    //Criando a classe BigMonster que herda a classe character 
    class BigMonster extends character{
        constructor(){
            super('Big Monster');
            this.life = 120;
            this.attack = 16;
            this.defense = 6;
            this.maxLife = this.life;

        }
    }
//Criando a classe do cenário
class Stage{
    constructor(fighter1,fighter2,fighter1EL,fighter2EL,logObjct){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1EL = fighter1EL;
        this.fighter2EL = fighter2EL;
        this.log = logObjct;

    }
    //Função para começar o jogo
    start(){
        this.update();


        this.fighter1EL.querySelector('.attackButton').addEventListener('click',() => this.doAttack(this.fighter1,this.fighter2));
        this.fighter2EL.querySelector('.attackButton').addEventListener('click',() => this.doAttack(this.fighter2,this.fighter1));
    }
    update(){
        //Fighter 1
        this.fighter1EL.querySelector('.name').innerHTML= `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife)* 100;
        this.fighter1EL.querySelector('.bar').style.width = `${f1Pct}%`;
        //Fighter 2 
        this.fighter2EL.querySelector('.name').innerHTML= `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife)* 100;
        this.fighter2EL.querySelector('.bar').style.width = `${f2Pct}%`;
        
    }
    //Função para do ataque para o addEventListener
    doAttack(attaking,attacked){
            if(attaking.life <= 0 || attacked.life <= 0){
                this.log.addmessege('Atacando cachorro morto.')
                return;
            }

            let attackFactor = (Math.random() * 2).toFixed(2);
            let defenseFactor = (Math.random() * 2).toFixed(2);

            let actualAttack = attaking.attack * attackFactor;
            let actualDefense = attacked.defense * defenseFactor;

            if(actualAttack > actualDefense){
                attacked.life -= actualAttack;
                this.log.addmessege(`${attaking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
            }else{
                this.log.addmessege(`${attacked.name} conseguiu defender...`)
            }

            this.update();
    }
}

class Log{
    list = [];

    constructor(listEL){
        this.listEL = listEL;
    }
    addmessege(msg){
        this.list.push(msg);
        this.render();

    }
    render(){
        this.listEL.innerHTML = '';

        for(let i in this.list){
            this.listEL.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }

}




