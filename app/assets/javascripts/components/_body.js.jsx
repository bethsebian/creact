var Body = React.createClass({
  componentDidMount() {
    $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
  },

  getInitialState() {
    return { skills: [] }
  },

  handleSubmit(skill) {
    var newState = this.state.skills.concat(skill);
    this.setState({ skills: newState })
  },

  handleDelete(id) {
    $.ajax({
      url: '/api/v1/skills/' + id,
      type: 'DELETE',
      success: () => {
        this.removeSkillFromDOM(id);
      }
    });
  },

  handleUpdate(skill) {
    $.ajax({
      url: `/api/v1/skills/${skill.id}`,
      type: 'PUT',
      data: { skill: skill },
      success: (skill) => {
        this.updateSkills(skill);
      }
    });
  },

  updateSkills(skill) {
    var skills = this.state.skills.filter((s) => {return s.id != skill.id });
    skills.push(skill);

    this.setState({ skills: skills });
  },

  removeSkillFromDOM(id) {
    var newSkills = this.state.skills.filter((skill) => {
      return skill.id != id;
    });

    this.setState({ skills: newSkills });
  },

  render() {
    return (
      <div>
        <NewSkill handleSubmit={this.handleSubmit} />
        <AllSkills skills={this.state.skills}
                   handleDelete={this.handleDelete}
                   handleUpdate={this.handleUpdate}/>
      </div>
    )
  }
});