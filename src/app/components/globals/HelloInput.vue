<template>
	<div
		:class="`o-helloform__element o-helloform__element--type-${type} ${(disabled?'o-helloform__element--disabled':'')}`"
	>
        <textarea
	        v-if="type === 'textarea'"
	        :name="name"
	        :id="name"
	        v-on:change="isEmpty"
	        :value="value"
	        class="o-helloform__input"
	        :required="required"
	        :placeholder="placeholder"
	        :disabled="disabled"
	        :has-value="(value?'true':'false')"
        />
		<select
			v-else-if="type === 'select'"
			:name="name"
			:id="name"
			v-on:change="isEmpty"
			:value="value"
			class="o-helloform__input"
			:required="required"
			:placeholder="placeholder"
			:disabled="disabled"
			:has-value="(value?'true':'false')"
		>
			<template v-if="choices">
				<option
					v-for="(optiontitle, optionvalue) in choices"
					:key="optionvalue"
					:value="optionvalue"
				>{{optiontitle}}
				</option>
			</template>
		</select>
		<input
			v-else
			:type="type"
			:name="name"
			:id="name"
			v-on:change="isEmpty"
			:value="value"
			class="o-helloform__input"
			:required="required"
			:placeholder="placeholder"
			:disabled="disabled"
			:has-value="(value?'true':'false')"
		/>
		<label :for="name" class="o-helloform__label">
			<span v-html="title+(required?'*':'')"></span>
			<span v-if="hint" @click="hint" class="o-button--hint">
				<hello-icon icon="fa/question"></hello-icon>
			</span>
		</label>
	</div>
</template>
<script>
	export default {
		props: {
			name: {
				type: String,
				required: true
			},
			title: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: "text"
			},
			placeholder: {
				type: String,
				default: ""
			},
			value: {
				type: String | Number,
				default: ""
			},
			required: {
				type: Boolean,
				default: false
			},
			checked: {
				type: Boolean,
				default: false
			},
			hellochange: {
				type: Boolean | Function,
				default: false
			},
			choices: {
				type: Boolean | Object,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			hint: {
				type: Function | Boolean,
				default: false
			}
		},
		methods: {
			isEmpty: function (evt) {
				const $e = evt.target;
				const value = $e.value;
				if (value === "") {
					$e.setAttribute("has-value", false);
				} else {
					$e.setAttribute("has-value", true);
				}
			}
		},
		mounted: function () {
			const $input = this.$el.querySelector(".o-helloform__input");
			if (this.type === "checkbox") {
				if (this.checked) {
					$input.setAttribute("checked", "checked");
				}
			}

			if (this.hellochange) {
				$input.onchange = () => {
					this.hellochange($input);
				};
			}
		}
	};
</script>

<!--
<template>
    <div class="form__element">
        <input
            :type="type"
            :name="name"
            :id="name"
            v-on:change="isEmpty"
            :value="value"
            class="form__input"
            :required="required"
        >
        <label :for="name" class="form__label">{{title}}{{(required?'*':'')}}</label>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        value: {
            type: String,
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        isEmpty: function(evt) {
            const $e = evt.target;
            const value = $e.value;
            if (value === "") {
                $e.setAttribute("has-value", false);
            } else {
                $e.setAttribute("has-value", true);
            }
        }
    }
};
</script>
-->
